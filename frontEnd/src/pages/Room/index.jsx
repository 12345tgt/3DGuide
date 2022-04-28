import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import styles from '../../assets/css/page/room.module.css';
import {getEquipmentInfo} from '../../services/api/equipment.api'
import { getRoomInfo } from '../../services/api/room.api'
import constant from './constant'
import handleHotPoints from '../../utils/handleHotPoints'

import Popup from '../../components/common/Popup'
import Pano from '../../components/content/Pano'
import Card from '../../components/content/Card'



/* 
  TODO:
    后期id等信息都通过调用api获取
*/

export default function Room() {
  const { roomNum } = useParams()
  const [roomName, setRoomName] = useState('')
  const [roomType, setRoomType] = useState('')

  const [equipment, setEquipment] = useState(null)

  // console.log(roomNum);
  const [isPopup, setIsPopup] = useState(constant.flag)
  const [hotPoints, setHotPoints] = useState(null)
  const [activeHotPoint, setActiveHotPoint] = useState(null)
  const [panoUrl, setPanoUrl] = useState('')
  // let hotPoints

  // 执行setState更新状态会造成组件重新渲染，组件重新渲染会再次执行Room函数，所以会无限次执行继而报下面的错误
  // Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
  // setIsPopup(true)
  // let activeHotPoint = null

  useEffect(() => {

    getEquipmentInfo(roomNum).then((res)=> {
      // console.log(res);

      setHotPoints(handleHotPoints(res.result))
      setEquipment(res.result)
    }).catch((err)=> {
      console.log(err);
    })

    getRoomInfo(roomNum).then(res=> {
      console.log(res);
      setPanoUrl(res.result.panoUrl)
      setRoomName(res.result.name)
      setRoomType(res.result.type)
    }).catch(err=> {
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
    // console.log(activeHotPoint);
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
      {/* 全景图 */}
      {hotPoints!==null && panoUrl!=='' && <Pano roomNum={roomNum} panoUrl={panoUrl} hotPoints={hotPoints} onClick={handleClick}></Pano>}
      {/* <div>isPopup:{isPopup ? 'true' : 'false'}</div> */}
      {equipment!==null && <Card roomName={roomName} roomType={roomType} equipment={equipment}></Card>}
    </div>
  )
}
