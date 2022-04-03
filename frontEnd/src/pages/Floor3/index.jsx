// 使用react-unity-webgl在项目中加载unity

import React,{useEffect,useState} from 'react'
import Unity, { UnityContext } from "react-unity-webgl";

import styles from '../../assets/css/floor3.module.css'

const unityContext = new UnityContext({
  loaderUrl: "Floor3/build/Floor3.loader.js",
  dataUrl: "Floor3/build/Floor3.data",
  frameworkUrl: "Floor3/build/Floor3.framework.js",
  codeUrl: "Floor3/build/Floor3.wasm",
});

export default function Floor3() {
  const [didError, setDidError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    unityContext.on("error", (message)=> {
      setDidError(true)
      setErrorMessage(message)
    })
  }, [])
  
  useEffect(() => {
    unityContext.on("progress", function (progression) {
      console.log(progression);
    });
  
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
