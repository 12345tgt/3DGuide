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
import styles from '../../assets/css/three.module.css'
import debounce from '../../utils/debounce'

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

// function debounce(func, wait) {
//   let timeout
//   let callNow

//   return function(...args) {
//     if(timeout) {
//       clearTimeout(timeout)
//     }
//     console.log("timeout",timeout);
//     callNow = !timeout
//     console.log("callNow",callNow);
//     // timeout赋值 此时callNow为false， 并延迟wait后将timeout置空, 即wait后func可再次执行
//     timeout = setTimeout(()=> {
//       timeout = null
//       console.log("settimeout");
//     }, wait)

//     if(callNow) {
//       func.apply(this, args)
//     }
//   }
// }

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
  let sphereGeometry = new THREE.SphereGeometry(/*半径*/1, /*垂直节点数量*/50, /*水平节点数量*/50);//节点数量越大，需要计算的三角形就越多，影响性能
  sphereGeometry.scale(1, 1, -1);

  // 线框模式，便于观察热点
  // var sphere = new THREE.Mesh(sphereGeometry);
  // sphere.material.wireframe = true

  // 全景贴图
  let texture = new THREE.TextureLoader().load(
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
  let sphereMaterial = new THREE.MeshBasicMaterial({map: texture});
  // 结合生成球体
  let sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);

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

  
  let pointTexture = new THREE.TextureLoader().load(hotspot);
  // sizeAttenuation:精灵的大小是否会被相机深度衰减。（仅限透视摄像头。）默认为true。
  let material = new THREE.SpriteMaterial( { map: pointTexture, color: 0xdddddd, sizeAttenuation: false} );
  let pointObjects = [];

  // 通过CSS2DObject添加描述信息
  let describe;
  for(let i=0;i<hotPoints.length;i++){
    let sprite = new THREE.Sprite( material );
    sprite.scale.set( 0.06, 0.06, 0.06 );
    sprite.position.set( hotPoints[i].position.x, hotPoints[i].position.y, hotPoints[i].position.z );
    sprite.detail = hotPoints[i].detail;

    describe = document.createElement( 'div' );
    describe.className = styles.describe;
    // 描述信息内容
    describe.innerHTML = sprite.detail.describe

    describe.addEventListener('pointerdown',()=> {
      console.log(1);
    })

    let describeLabel = new CSS2DObject(describe)
    describeLabel.position.set(hotPoints[i].position.x, hotPoints[i].position.y, hotPoints[i].position.z)
    sprite.add(describeLabel)

    pointObjects.push(sprite);
    scene.add( sprite );
  }
  // console.log(pointObjects);
  
  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize( visibleAreaWidth, visibleAreaHeight );
  // 外部引入样式
  labelRenderer.domElement.className = styles.label
  container.appendChild( labelRenderer.domElement );

  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();
  let intersects = []
  let temp
  let timer
  let dbhoverPoint = debounce(hoverPoint, 100)
  let dbleavePoint = debounce(leavePoint, 100)

  // 鼠标变成手型
  container.addEventListener("mousemove",function(event){
    // event.preventDefault();
    
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    // mouse.x = (<鼠标相对于可视区域的横坐标> / <可视区域的宽>) * 2 - 1;
    // mouse.y = -(<鼠标相对于可视区域的纵坐标> / <可视区域的高>) * 2 + 1;
    mouse.x = ( (event.clientX - renderer.domElement.getBoundingClientRect().left) / visibleAreaWidth ) * 2 - 1;
    mouse.y = - ( (event.clientY - renderer.domElement.getBoundingClientRect().top) / visibleAreaHeight ) * 2 + 1;

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera( mouse, camera );
    // 计算物体和射线的焦点
    intersects = raycaster.intersectObjects( pointObjects );
    
    // 悬浮出现弹窗有bug，timer没有成功清除
    if(intersects.length>0){
      dbhoverPoint()

    } else {
      dbleavePoint()
    }
  });
  function hoverPoint() {
    document.body.style.cursor = "pointer"

    // 直接设置describe.style.visibility = "hidden"不行，原因未知，猜测是使用css module的原因
    /* 
      TODO:
        通过获取的方式需要进行循环，对每个热点都进行处理
        还是尝试修改css样式
    */
    temp = document.getElementsByClassName("three_describe__5WQpm")[1]
    temp.style.visibility = 'visible'

    console.log(timer);
    clearTimeout(timer)
    timer = null
  }

  function leavePoint() {
    document.body.style.cursor = "default"
    // 设置定时x毫秒后消失，当移动到describe时取消
    if(temp && temp.style.visibility == 'visible') { 
      if(!timer) {
        timer = setTimeout(() => {
          temp.style.visibility = 'hidden'
          console.log("消失");
        }, 1000)
      }

      temp.addEventListener('mouseover', ()=> {
        clearTimeout(timer)
      })
      
      temp.addEventListener('mouseleave',()=> {
        temp.style.visibility = 'hidden'
      })
    }
  }

  // 监听点击
  container.addEventListener("click",function(event){
    if(intersects.length>0){
        console.log("点击了热点"+intersects[0].object.detail.title);
        // console.log(mouse);
        // 点击弹出气泡，待实现
        // alert("点击了热点"+intersects[0].object.detail.title)
    }
  });

  //辅助函数 获取世界坐标以帮助确定热点位置, 不用时注释
  // container.addEventListener("click",function(){
  //   raycaster.setFromCamera( mouse, camera );
  //   intersects = raycaster.intersectObjects( [sphere] );
  //   // point —— 相交部分的点（世界坐标）
  //   var {x,y} = intersects[0].point
  //   console.log("世界坐标：", {
  //     x: x.toFixed(2),
  //     y: y.toFixed(2)
  //   });
  // });


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
  // controls.autoRotate = false;

  controls.autoRotateSpeed = 0.5
  // 启用阻尼
  controls.enableDamping = true;

  // 监听鼠标点击，停止自动旋转
  container.addEventListener('click',()=> {
    controls.autoRotate = false;
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