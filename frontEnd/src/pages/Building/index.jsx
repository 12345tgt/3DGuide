import React,{ useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Unity, { UnityContext } from "react-unity-webgl";

import BF_Sider from '../../components/content/BF_Sider'
import Help from '../../components/content/Help';

import styles from '../../assets/css/page/building.module.css'

export default function Building() {
  const [didError, setDidError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  // const [roomNum, setRoomNum] = useState()
  const [isLoaded, setIsLoaded] = useState(false);

  const [quality, setQuality] = useState('extreme')

  const { buildingName } = useParams()
  const navigate = useNavigate()
  

  const loaderUrl = `/Building${buildingName}_${quality}/build/Building${buildingName}_${quality}.loader.js`
  const dataUrl = `/Building${buildingName}_${quality}/build/Building${buildingName}_${quality}.data`
  const frameworkUrl = `/Building${buildingName}_${quality}/build/Building${buildingName}_${quality}.framework.js`
  const codeUrl = `/Building${buildingName}_${quality}/build/Building${buildingName}_${quality}.wasm`

  let mouseDownTime, mouseUpTime, clickedFloor

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
      clickedFloor = msg
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
        handleJumpFloor(clickedFloor)
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

  function handleJumpFloor (clickedFloor) {
    let floorNum
    try {
      // F123456
      console.log("building",clickedFloor);
      switch (clickedFloor) {
        case 'F1':
          // 跳转到一层界面
          floorNum = '1'
          // navigate('/floor/1',)
          break;
        case 'F2':
          floorNum = '2'
          // navigate('/floor/2')
          break;
        case 'F3':
          floorNum = '3'
          // navigate('/floor/3')
          break;
        case 'F4':
          floorNum = '4'
          // navigate('/floor/4')
          break;
        case 'F5':
          floorNum = '5'
          // navigate('/floor/5')
          break;
        case 'F6':
          floorNum = '6'
          // navigate('/floor/6')
          break;
      }
      navigate(`/floor?buildingName=${buildingName}&floorNum=${floorNum}`)
      // navigate(floorUrl, {
      //   state: {
      //     buildingName
      //   }
      // })

    } catch (err) {
      console.log(err);
    }
  }


  return didError === true ? (
    <div>that's an error {errorMessage}</div>
  ) : (
    <>
      <Unity unityContext={unityContext} className={styles.unity}/>
      <BF_Sider title='可选楼层' options={['F1','F2','F3','F4','F5','F6']} buildingName={buildingName}></BF_Sider>
      <Help></Help>
    </>
  );
}
