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
let scene, camera, renderer, controls, fov=90, near = 10, far = 100;
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

      //透视摄像机，fov — 摄像机视锥体垂直视野角度，从视图的底部到顶部，以角度来表示
      camera = new THREE.PerspectiveCamera(fov, visibleAreaWidth / visibleAreaHeight, 0.1, 100);
      
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

      // 热点贴图
      let pointTexture = new THREE.TextureLoader().load(hotspot);
      // sizeAttenuation:精灵的大小是否会被相机深度衰减。（仅限透视摄像头。）默认为true。
      let material = new THREE.SpriteMaterial( { map: pointTexture, color: 0xff0000, sizeAttenuation: false} );

      // 热点数组
      let pointObjects = [];
      props.hotPoints.forEach((item, index)=> {
        console.log(item);
        let sprite = new THREE.Sprite( material );
        // 贴图大小
        sprite.scale.set( 0.06, 0.06, 0.06 );
        // 贴图位置
        sprite.position.set( item.position.x, item.position.y, item.position.z );
        // 标识id，用于弹窗识别
        sprite.hotPointId = item.id

        pointObjects.push(sprite);
        scene.add( sprite );
      })
      // console.log(pointObjects);

      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      // 相交的热点
      let intersects = []

      // 防抖,不确定是否有用
      let dbhoverPoint = debounce(hoverPoint, 100)
      let dbleavePoint = debounce(leavePoint, 100)

      // 鼠标变成手型
      container.addEventListener("mousemove",function(event){
        // event.preventDefault();
        
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 ~ +1)
        // 原理是WebGL坐标系和屏幕坐标系不一样,y轴取负是因为他俩Y轴方向相反
        mouse.x = ( (event.clientX - renderer.domElement.getBoundingClientRect().left) / visibleAreaWidth ) * 2 - 1;
        mouse.y = - ( (event.clientY - renderer.domElement.getBoundingClientRect().top) / visibleAreaHeight ) * 2 + 1;

        // 从摄像机位置向鼠标点击位置发射射线
        raycaster.setFromCamera( mouse, camera );
        // 计算物体和射线的焦点
        intersects = raycaster.intersectObjects( pointObjects );
        
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
      container.addEventListener("click",function(){
        // 监听鼠标点击，停止自动旋转
        controls.autoRotate = false;

        if(intersects.length>0){
            console.log(intersects[0].object);
            // console.log(isPopup.flag);
            // 传出id
            isPopup.setHotPointId(intersects[0].object.hotPointId)
            // 弹出弹窗
            isPopup.setPopup()
        } else {
          isPopup.setHotPointId('')
        }
      });

      //辅助函数 获取世界坐标以帮助确定热点位置, 不用时注释
      container.addEventListener("click",function(){
        raycaster.setFromCamera( mouse, camera );
        // 与全景图球体的交点
        intersects = raycaster.intersectObjects( [sphere] );
        // point —— 相交部分的点（世界坐标）
        var {x,y,z} = intersects[0].point
        console.log("世界坐标：", {
          x: x.toFixed(2),
          y: y.toFixed(2),
          z: z.toFixed(2)
        });
      });

      //鼠标滑轮-鼠标上下滑轮实现放大缩小效果
      container.addEventListener('mousewheel', mousewheel, false);
      function mousewheel(e) {
        e.preventDefault();
        //e.stopPropagation();
        // 放大时减小fov，缩小时增大fov
        if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件
          if (e.wheelDelta > 0) { //当滑轮向上滚动时
            fov -= (near < fov ? 1 : 0);
          }
          if (e.wheelDelta < 0) { //当滑轮向下滚动时
            fov += (fov < far ? 1 : 0);
          }
        } 
        else if (e.detail) { //Firefox滑轮事件
          if (e.detail > 0) { //当滑轮向上滚动时
            fov -= (near < fov ? 1 : 0);;
          }
          if (e.detail < 0) { //当滑轮向下滚动时
            fov += (fov < far ? 1 : 0);
          }
        }
        // console.info('camera.fov:'+camera.fov);
        // console.info('camera.x:'+camera.position.x);
        // console.info('camera.y:'+camera.position.y);
        // console.info('camera.z:'+camera.position.z);
        //改变fov值，并更新场景的渲染
        camera.fov = fov;
        camera.updateProjectionMatrix();
        // renderer.render(scene, camera);
      }

      //镜头控制器,注意此处render用renderer.domElement会出问题
      // controls = new OrbitControls(camera,labelRenderer.domElement);
      controls = new OrbitControls(camera, renderer.domElement);

      // 禁止缩放
      controls.enableZoom = false;
      // controls.zoomSpeed = 5;
      // controls.minZoom = 0.5;
      // controls.maxZoom = 2;

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