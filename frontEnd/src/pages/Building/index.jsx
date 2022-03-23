import React,{ useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import styles from '../../assets/css/building.module.css'

export default function Building() {
  const navigate = useNavigate()

  function handleJumpFloor (e) {
    try {
      // F123456
      // console.log("building",e);
      let data
      typeof e.data == 'string' ? data = e.data : data = '';
      // console.log("building",data);
      switch (data) {
        case 'F1':
          // 跳转到一层界面
          navigate('/floor/01')
          break;
        case 'F2':
          // 跳转到一层界面
          navigate('/floor/02')
          break;
        case 'F3':
          // 跳转到一层界面
          navigate('/floor/03')
          break;
        case 'F4':
          // 跳转到一层界面
          navigate('/floor/04')
          break;
        case 'F5':
          // 跳转到一层界面
          navigate('/floor/05')
          break;
        case 'F6':
          // 跳转到一层界面
          navigate('/floor/06')
          break;
      }
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  }


  // 因为onmessage兼容性问题，后期进行判断
  window.onmessage = handleJumpFloor
  // window.addEventListener('message', handleJumpFloor)

  // useEffect(() => {
  
  //   return () => {
  //     // window.removeEventListener("message", handleJumpFloor)
  //   }
  // }, [])
  


  return (
    <div>
      {/* Building */}
      {/* 
        TODO:
          iframe全屏
          不使用iframe，直接放在项目中
      */}
      {/* <iframe src="http://47.108.179.245:8088/building" frameBorder='0' width='1400' height='600'></iframe> */}

      <iframe src="http://47.108.179.245:8088/building" frameBorder='0' className={styles.iframe} scrolling='no'>
        Your browser doesn't support iframe
      </iframe>
    </div>
  )
}
