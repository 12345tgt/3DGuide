// 使用react-unity-webgl在项目中加载unity

import React,{useEffect,useState} from 'react'
import Unity, { UnityContext } from "react-unity-webgl";

import styles from '../../assets/css/floor3.module.css'
import jumpParameters from '../../utils/jumpParameters'

const unityContext = new UnityContext({
  loaderUrl: "Floor3/build/Floor3.loader.js",
  dataUrl: "Floor3/build/Floor3.data",
  frameworkUrl: "Floor3/build/Floor3.framework.js",
  codeUrl: "Floor3/build/Floor3.wasm",
});

export default function Floor3() {
  const [didError, setDidError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  // const [roomNum, setRoomNum] = useState()

  let roomNum, mouseDownTime, mouseUpTime

  useEffect(() => {

    unityContext.on("error", (message)=> {
      setDidError(true)
      setErrorMessage(message)
    })

    unityContext.on("progress", (progression)=> {
      console.log(progression);
    });

    // 监听点击房间
    unityContext.on("roomClicked",(msg)=> {
      // setRoomNum()
      // console.log(jumpParameters(msg));
      roomNum = jumpParameters(msg)
      mouseDownTime = new Date().getTime()
      // console.log(mouseDownTime);

    })
    //监听鼠标抬起
    unityContext.on("roomMouseUp",()=> {
      mouseUpTime = new Date().getTime()
      // console.log(mouseUpTime);
      // console.log(mouseUpTime - mouseDownTime);

      // 时间间隔在250以内认定为点击，否则为拖动
      if(mouseDownTime && mouseUpTime - mouseDownTime <= 250) {
        roomNum == 'G-101' || roomNum == 'G-318' || roomNum == 'G-336' ? window.open(`http://localhost:3000/room/${roomNum}`) : console.log("无全景图");
      }
    })

    return () => {
      unityContext.removeEventListener("progress");
      unityContext.removeEventListener("error");
      unityContext.removeEventListener("roomClicked");
      unityContext.removeEventListener("roomMouseUp");
    }
  }, [])

  
  
  return didError === true ? (
    <div>that's an error {errorMessage}</div>
  ) : (
    <Unity unityContext={unityContext} className={styles.unity}/>
  );
}
