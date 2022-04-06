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
      let roomNum = jumpParameters(msg)
      roomNum == 'G-101' || roomNum == 'G-318' || roomNum == 'G-336' ? window.open(`http://localhost:3000/room/${roomNum}`) : console.log("无全景图");
    })

    return () => {
      unityContext.removeEventListener("progress");
    }
  }, [])

  
  
  return didError === true ? (
    <div>that's an error {errorMessage}</div>
  ) : (
    <Unity unityContext={unityContext} className={styles.unity}/>
  );
}
