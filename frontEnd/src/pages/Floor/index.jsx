// 使用react-unity-webgl在项目中加载unity
import React,{useEffect,useState} from 'react'
import Unity, { UnityContext } from "react-unity-webgl";
import { useParams, useLocation, useSearchParams } from 'react-router-dom'

import BF_Sider from '../../components/content/BF_Sider'
import Help from '../../components/content/Help';

import styles from '../../assets/css/page/floor3.module.css'
import jumpParameters from '../../utils/jumpParameters'
import {getRoomInfo, getFloorRooms} from '../../services/api/room.api'

/* 
  TODO:
    错误边界
    捕获unityContext加载unity资源错误
*/


export default function Floor3() {
  const [didError, setDidError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  // const [roomNum, setRoomNum] = useState()
  const [isLoaded, setIsLoaded] = useState(false);
  const [floorRooms, setFloorRooms] = useState([])


  // const { floorNum } = useParams()
  // const {state: {buildingName}} = useLocation()

  const [searchParams, setSearchParams] = useSearchParams();
  const buildingName = searchParams.get('buildingName')
  const floorNum = searchParams.get('floorNum')  
  
  let roomNum, mouseDownTime, mouseUpTime

  /* 
    TODO:
      修改为${buildingName}Floor${floorNum}
  */
  const loaderUrl = `/Floor${floorNum}/build/Floor${floorNum}.loader.js`
  const dataUrl = `/Floor${floorNum}/build/Floor${floorNum}.data`
  const frameworkUrl = `/Floor${floorNum}/build/Floor${floorNum}.framework.js`
  const codeUrl = `/Floor${floorNum}/build/Floor${floorNum}.wasm`

  const unityContext = new UnityContext({
    loaderUrl,
    dataUrl,
    frameworkUrl,
    codeUrl
  });

  useEffect(()=> {
    // console.log(buildingName);
    getFloorRooms(buildingName, floorNum).then((res)=> {
      console.log(res);
      setFloorRooms(res.result)
    })
  },[])


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

    // 监听点击房间
    unityContext.on("roomClicked",(msg)=> {
      // setRoomNum()
      // 格式为'G_101'和'G_101_1'
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
        // console.log(floorRooms);
        if(floorRooms.includes(roomNum)){
          window.open(`http://localhost:3000/room/${roomNum}`)
        } else {
          alert(`暂无${roomNum}房间信息`)
        }

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
  }, [floorRooms])
  
  
  return didError === true ? (
    <div>that's an error {errorMessage}</div>
  ) : (
    <>
      <Unity unityContext={unityContext} className={styles.unity}/>
      <BF_Sider title='可选房间' options={floorRooms}></BF_Sider>
      <Help></Help>
    </>
  );
}
