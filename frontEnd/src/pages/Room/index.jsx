import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import styles from '../../assets/css/room.module.css';
import {getEquipmentInfo} from '../../services/api/equipment.api'
import constant from './constant'
import handleHotPoints from '../../utils/handleHotPoints'

import Popup from '../../components/common/Popup'
import Pano from '../../components/content/Pano'


/* 
  TODO:
    后期id等信息都通过调用api获取
*/

// let three
export default function Room() {
  const { roomNum } = useParams()
  // console.log(roomNum);
  const [isPopup, setIsPopup] = useState(constant.flag)
  const [hotPoints, setHotPoints] = useState([])
  const [activeHotPoint, setActiveHotPoint] = useState(null)

  // let hotPoints

  // 执行setState更新状态会造成组件重新渲染，组件重新渲染会再次执行Room函数，所以会无限次执行继而报下面的错误
  // Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
  // setIsPopup(true)
  // let activeHotPoint = null

  useEffect(() => {
    // initThree(roomNum)

    getEquipmentInfo(roomNum).then((res)=> {
      // console.log(res);

      setHotPoints(handleHotPoints(res.result))
      // hotPoints = handleHotPoints(res.result)
    }).catch((err)=> {
      console.log(err);
    })
  }, [])
  
  
  function handleClick() {
    console.log('点击');
    setIsPopup(constant.flag)
    let temp = hotPoints.filter((item)=> {
      return item.id == constant.id
    })
    temp.length>0 && setActiveHotPoint(temp)
    console.log(activeHotPoint);
  }

  // 结局弹窗出现后鼠标始终是手型bug。原因是three中悬浮热点更改后没有移出所以没有更改回来
  useEffect(() => {
    // console.log(isModalVisible);
    if(isPopup) {
      document.body.style.cursor = "default"
    }
  }, [isPopup])

  useEffect(() => {
    console.log(activeHotPoint);
  }, [activeHotPoint])
  

  return (
    
    <div className={styles.box}>
      {/* 弹窗 */}
      {activeHotPoint && <Popup detail={activeHotPoint[0].detail} isPopup={isPopup} setIsPopup={setIsPopup} footerNum={1}></Popup>}
      {hotPoints.length>0 && <Pano roomNum={roomNum} hotPoints={hotPoints} onClick={handleClick}></Pano>}
      {/* <div id='threejs' className={styles.pano} onClick={handleClick}></div> */}
      <div>isPopup:{isPopup ? 'true' : 'false'}</div>
    </div>
  )
}
