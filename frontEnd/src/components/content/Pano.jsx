import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import {CSS2DObject, CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer.js'

import styles from '../../assets/css/page/room.module.css';
import hotspot from '../../assets/photo/circle-圆圈.png';
import debounce from '../../utils/debounce'

import isPopup from '../../pages/Room/constant'

import audio from '../../assets/audio/dylanf - 卡农（经典钢琴版）.mp3';
/*    
  TODO:
    将音频改为接口获取链接
*/
 

// three.js部分
let scene, camera, renderer, controls;
// 约900px
let visibleAreaWidth = window.innerWidth * 3/5;
// 约500px
let visibleAreaHeight = window.innerHeight * 5/7;

/* 
  TODO:
    项目优化
    及时卸载等
*/
function onWindowResize() {
  visibleAreaWidth = window.innerWidth * 3/5;
  visibleAreaHeight = window.innerHeight * 5/7;

  // 重新定义摄像机视锥体长宽比
  camera.aspect = visibleAreaWidth / visibleAreaHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( visibleAreaWidth, visibleAreaHeight );
  // labelRenderer.setSize( visibleAreaWidth, visibleAreaHeight );
}
//帧同步重绘
function loop() {
  requestAnimationFrame(loop);
  
  controls.update();
  renderer.render(scene, camera);
  // labelRenderer.render( scene, camera );
}

export default function Pano(props){
  const [isPano, setIsPano] = useState(true)

  useEffect(() => {
    console.log(props);
    // 基础初始化
    const container = document.getElementById( 'pano' );
    // document.body.appendChild( container );
    if(props.panoUrl) {
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
        // require(`../../assets/photo/${props.roomNum}.jpg`)
        props.panoUrl,

        // // onLoad回调
        ()=> {
          // renderer.render(scene, camera);
          console.log("贴图完成");
        },
        // onProgress回调
        undefined,
        // onError回调
        ()=> {
          console.log("贴图加载失败");
        }
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
      let material = new THREE.SpriteMaterial( { map: pointTexture, color: 0xff0000, sizeAttenuation: false} );
      let pointObjects = [];

      // let describe;
      props.hotPoints.forEach((item, index)=> {
        console.log(item);
        let sprite = new THREE.Sprite( material );
        sprite.scale.set( 0.06, 0.06, 0.06 );
        sprite.position.set( item.position.x, item.position.y, item.position.z );

        sprite.hotPointId = item.id

        pointObjects.push(sprite);
        scene.add( sprite );
      })
      // console.log(pointObjects);
      
      // labelRenderer = new CSS2DRenderer();
      // labelRenderer.setSize( visibleAreaWidth, visibleAreaHeight );
      // 外部引入样式
      // labelRenderer.domElement.className = styles.label
      // container.appendChild( labelRenderer.domElement );

      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      let intersects = []

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

      }

      function leavePoint() {
        document.body.style.cursor = "default"

      }

      // 监听点击
      container.addEventListener("click",function(event){
        // 监听鼠标点击，停止自动旋转
        controls.autoRotate = false;

        if(intersects.length>0){
            console.log(intersects[0].object);
            // console.log(isPopup.flag);
            isPopup.setHotPointId(intersects[0].object.hotPointId)
            isPopup.setPopup()
        } else {
          isPopup.setHotPointId('')
        }
      });

      //辅助函数 获取世界坐标以帮助确定热点位置, 不用时注释
      container.addEventListener("click",function(){
        raycaster.setFromCamera( mouse, camera );
        intersects = raycaster.intersectObjects( [sphere] );
        // point —— 相交部分的点（世界坐标）
        var {x,y,z} = intersects[0].point
        console.log("世界坐标：", {
          x: x.toFixed(2),
          y: y.toFixed(2),
          z: z.toFixed(2)
        });
      });


      //镜头控制器,注意此处render用renderer.domElement会出问题
      // controls = new OrbitControls(camera,labelRenderer.domElement);
      controls = new OrbitControls(camera, renderer.domElement);

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

      loop();
    } 
    else {
      // console.log('无全景图');
      setIsPano(false)
      container.style.width = '60vw';
      container.style.height = '55vh';
      container.style.backgroundColor = 'black';
      // 提示信息水平垂直居中
      container.style.paddingTop = '25vh'
      container.style.paddingLeft = '21vw'

      // const tip = document.createElement('p');
      // tip.innerHTML = '抱歉该房间尚未拍摄全景图';
      // tip.style.color = 'white';
      // tip.style.fontSize = '23px';
      // tip.style.letterSpacing = '3px';
      // container.appendChild(tip);

    }
    
  }, [])
  
  return (
    <div className={styles.box}>
      <div id='pano' className={styles.pano} onClick={props.onClick}>
        { isPano || <p className={styles.tip}>抱歉该房间尚未拍摄全景图</p> }
      </div>
       {isPano && <audio controls className={styles.audio} src={audio}>
        抱歉，您的浏览器不支持 audio 元素。
      </audio>}
    </div>
  )
}