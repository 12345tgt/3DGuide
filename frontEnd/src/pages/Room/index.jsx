import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import {CSS2DRenderer,CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js'

import {initThree} from './three'

import styles from '../../assets/css/room.module.css';


 
export default function Room() {
  const { roomNum } = useParams()
  // console.log(roomNum);

  useEffect(() => {
    initThree(roomNum)
  
    return () => {
      alert("卸载组件")
    }
  }, [])
  

  return (
    <div className={styles.box}>
      <div id='threejs' className={styles.pano}></div>
    </div>
  )
}
