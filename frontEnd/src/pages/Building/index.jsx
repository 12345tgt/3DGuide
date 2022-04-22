import React,{ useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import Unity, { UnityContext } from "react-unity-webgl";

import styles from '../../assets/css/building.module.css'

export default function Building() {
  const [didError, setDidError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  // const [roomNum, setRoomNum] = useState()
  const [isLoaded, setIsLoaded] = useState(false);

  const { buildingName } = useParams()
  const navigate = useNavigate()
  
  const loaderUrl = `/Building${buildingName}/build/Building${buildingName}.loader.js`
  const dataUrl = `/Building${buildingName}/build/Building${buildingName}.data`
  const frameworkUrl = `/Building${buildingName}/build/Building${buildingName}.framework.js`
  const codeUrl = `/Building${buildingName}/build/Building${buildingName}.wasm`

  let mouseDownTime, mouseUpTime

  const unityContext = new UnityContext({
    loaderUrl,
    dataUrl,
    frameworkUrl,
    codeUrl
  });

  useEffect(() => {
    unityContext.on("error", (message)=> {
      setDidError(true)
      setErrorMessage(message)
    })

    unityContext.on("progress", (progression)=> {
      console.log(progression);
    });

    unityContext.on("loaded", function () {
      setIsLoaded(true);
    });

    // 监听点击楼层
    unityContext.on("floorClicked",(msg)=> {
      // 格式为'G_101'和'G_101_1'
      console.log(msg);
      mouseDownTime = new Date().getTime()
    })

    //监听鼠标抬起
    unityContext.on("floorMouseUp",()=> {
      mouseUpTime = new Date().getTime()
      // console.log(mouseUpTime);
      // console.log(mouseUpTime - mouseDownTime);
      console.log('鼠标抬起');
      // 时间间隔在250以内认定为点击，否则为拖动
      if(mouseDownTime && mouseUpTime - mouseDownTime <= 250) {
        console.log('点击');
      }
    })

    return () => {
      // unityContext.removeEventListener("progress");
      // unityContext.removeEventListener("error");
      // unityContext.removeEventListener("roomClicked");
      // unityContext.removeEventListener("roomMouseUp");
      // unityContext.removeEventListener("loaded");

      // 卸载所有事件监听器
      unityContext.removeAllEventListeners();
    }
  })

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
          navigate('/floor/1')
          break;
        case 'F2':
          // 跳转到一层界面
          navigate('/floor/2')
          break;
        case 'F3':
          // 跳转到一层界面
          navigate('/floor/3')
          break;
        case 'F4':
          // 跳转到一层界面
          navigate('/floor/4')
          break;
        case 'F5':
          // 跳转到一层界面
          navigate('/floor/5')
          break;
        case 'F6':
          // 跳转到一层界面
          navigate('/floor/6')
          break;
      }
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  }


  // 因为onmessage兼容性问题，后期进行判断
  // window.onmessage = handleJumpFloor
  // window.addEventListener('message', handleJumpFloor)

  // useEffect(() => {
  
  //   return () => {
  //     // window.removeEventListener("message", handleJumpFloor)
  //   }
  // }, [])
  


  return didError === true ? (
    <div>that's an error {errorMessage}</div>
  ) : (
    <Unity unityContext={unityContext} className={styles.unity}/>
  );
}
