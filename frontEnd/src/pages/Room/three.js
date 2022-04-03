// Room index.js中的three.js相关拆分到这个文件夹中

// 本地模块
// import * as THREE from '../../utils/three/three.js-dev/build/three.module.js';
// import {OrbitControls} from '../../utils/three/three.js-dev/examples/jsm/controls/OrbitControls.js'
// import {CSS2DObject, CSS2DRenderer} from '../../utils/three/three.js-dev/examples/jsm/renderers/CSS2DRenderer.js'

// import * as THREE from '../../utils/three/build/three.js';
// import {OrbitControls} from '../../utils/three/OrbitControls.js'
// import {CSS2DObject, CSS2DRenderer} from '../../utils/three/CSS2DRenderer.js'

// npm模式
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {CSS2DObject, CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer.js'

// import qjImg from '../../assets/101.jpg'
    
import hotspot from '../../assets/photo/circle-圆圈.png';
import hotPoints from './hotPoints'
/*    
  TODO:
    将所有写死的数据通过传入的房间号改成动态的
      已完成全景图，只要将全景图名字改成房间号就可以
*/
 

// three.js部分
let scene, camera, renderer, controls, labelRenderer;
// 约900px
let visibleAreaWidth = window.innerWidth * 3/5;
// 约500px
let visibleAreaHeight = window.innerHeight * 5/7;

/* 
  TODO:
    项目优化
    及时卸载等
*/


function initThree(roomNum){
  // 基础初始化
  const container = document.getElementById( 'threejs' );
  // document.body.appendChild( container );

  //场景
  scene = new THREE.Scene();

  //镜头
  camera = new THREE.PerspectiveCamera(90, visibleAreaWidth / visibleAreaHeight, 0.1, 100);
  
  camera.position.set(0, 0, 0.01);
  
  // 创建球体
  var sphereGeometry = new THREE.SphereGeometry(/*半径*/1, /*垂直节点数量*/50, /*水平节点数量*/50);//节点数量越大，需要计算的三角形就越多，影响性能
  sphereGeometry.scale(1, 1, -1);

  // 线框模式，便于观察热点
  // var sphere = new THREE.Mesh(sphereGeometry);
  // sphere.material.wireframe = true

  // 全景贴图
  var texture = new THREE.TextureLoader().load(
    require(`../../assets/photo/${roomNum}.jpg`)
    // // onLoad回调
    // ()=> {
    //   // renderer.render(scene, camera);
    //   console.log("贴图完成");
    // },
    // // onProgress回调
    // undefined,
    // // onError回调
    // ()=> {
    //   console.log("贴图加载失败");
    // }
  );

  // 球体材料
  var sphereMaterial = new THREE.MeshBasicMaterial({map: texture});
  // 结合生成球体
  var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);

  scene.add(sphere);

  // xyz轴辅助
  // var axesHelper = new THREE.AxesHelper(800);
  // scene.add(axesHelper);

  //渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( visibleAreaWidth, visibleAreaHeight );
  container.appendChild(renderer.domElement);

  
  
  // 监听窗口大小变化
  window.addEventListener( 'resize', onWindowResize, false );

  
  var pointTexture = new THREE.TextureLoader().load(hotspot);
  // sizeAttenuation:精灵的大小是否会被相机深度衰减。（仅限透视摄像头。）默认为true。
  var material = new THREE.SpriteMaterial( { map: pointTexture, color: 0xff2222, sizeAttenuation: false} );
  var poiObjects = [];

  // 通过CSS2DObject添加描述信息
  let describe;
  for(var i=0;i<hotPoints.length;i++){
    var sprite = new THREE.Sprite( material );
    sprite.scale.set( 0.1, 0.1, 0.1 );
    sprite.position.set( hotPoints[i].position.x, hotPoints[i].position.y, hotPoints[i].position.z );
    sprite.detail = hotPoints[i].detail;

    describe = document.createElement( 'div' );
    describe.className = 'describe';
    describe.innerHTML = sprite.detail.describe
    describe.style.marginTop = '-1em'
    // describe.style.pointerEvents = 'none'
    describe.style.color = '#0f0'
    describe.style.fontSize = '16px';
    describe.addEventListener('pointerdown',()=> {
      console.log(1);
    })

    // describe.style.position = 'absolute';
    describe.style.backgroundColor = 'rgba(25,25,25,0.5)';
    // describe.style.zIndex = 1000; //无效
    let describeLabel = new CSS2DObject(describe)
    describeLabel.position.set(hotPoints[i].position.x, hotPoints[i].position.y, hotPoints[i].position.z)
    sprite.add(describeLabel)

    poiObjects.push(sprite);
    scene.add( sprite );
  }
  // console.log(poiObjects);
  
  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize( visibleAreaWidth, visibleAreaHeight );

  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  // labelRenderer.domElement.style.zIndex = '1001';   //无效
  // labelRenderer.domElement.style.pointerEvents = 'none'
  container.appendChild( labelRenderer.domElement );

  // 监听点击
  container.addEventListener("click",function(event){
    // event.preventDefault();

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    // mouse.x = (<鼠标相对于可视区域的横坐标> / <可视区域的宽>) * 2 - 1;
    // mouse.y = -(<鼠标相对于可视区域的纵坐标> / <可视区域的高>) * 2 + 1;
    mouse.x = ( (event.clientX - renderer.domElement.getBoundingClientRect().left) / visibleAreaWidth ) * 2 - 1;
    // mouse.x = ( event.clientX / window.innerWidth/2 ) * 2 - 1;
    mouse.y = - ( (event.clientY - renderer.domElement.getBoundingClientRect().top) / visibleAreaHeight ) * 2 + 1;
    // mouse.y = - ( event.clientY / window.innerHeight/2 ) * 2 + 1;
    // console.log(mouse);
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera( mouse, camera );
    // 计算物体和射线的焦点
    var intersects = raycaster.intersectObjects( poiObjects );
    console.log(intersects);
    if(intersects.length>0){
        console.log("点击了热点"+intersects[0].object.detail.title);

        // 点击弹出气泡，待实现
        alert("点击了热点"+intersects[0].object.detail.title)
    }
  });

  /* 
    想要实现鼠标移动到热点上变成手指和悬浮弹出气泡。可以在container上监听鼠标移动
    当物体和射线有交点时，设置样式cursor: pointer（待实现）
    示例：
    if(intersects.length > 0) {
        $('html,body').css('cursor', 'pointer');
    } else {
        $('html,body').css('cursor', 'default');
    }
  */

  //镜头控制器,注意此处render用renderer.domElement会出问题
  // controls = new OrbitControls(camera,labelRenderer.domElement);
  controls = new OrbitControls(camera, container);
  // 禁止缩放
  controls.enableZoom = false;
  // 禁止相机平移，阻止右键拖动
  controls.enablePan = false;
  // 旋转速度
  controls.rotateSpeed = 0.25;
  // 自动旋转
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5
  // 启用阻尼
  controls.enableDamping = true;

  // 监听鼠标点击，停止自动旋转
  container.addEventListener('click',()=> {
    // console.log(1);
    controls.autoRotate = false;
    // console.log(controls.autoRotate);
  })

  loop();

  // start();
}

function onWindowResize() {
  visibleAreaWidth = window.innerWidth * 3/5;
  visibleAreaHeight = window.innerHeight * 5/7;

  // 重新定义摄像机视锥体长宽比
  camera.aspect = visibleAreaWidth / visibleAreaHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( visibleAreaWidth, visibleAreaHeight );
  labelRenderer.setSize( visibleAreaWidth, visibleAreaHeight );
}
//帧同步重绘
function loop() {
  requestAnimationFrame(loop);
  
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render( scene, camera );
}

export {
  initThree
}