import React, {useEffect, useState} from 'react'
import test from './test'

import Sider from '../../components/common/Sider'
import BF_Sider from '../../components/content/BF_Sider'
import Card from '../../components/content/Card'
import R_Sider from '../../components/content/R_Sider'

import Help from '../../components/content/Help';

import {getEquipmentInfo} from '../../services/api/equipment.api'
import { getRoomInfo } from '../../services/api/room.api'

import handleHotPoints from '../../utils/handleHotPoints'

// 将监听器放组件外也只输出一次0
// document.addEventListener('click', handleClick)
export default function Test() {
  // let num = 10
  // function handleClick() {
  //   console.log(num);
  // }
  // console.log('test');
  // useEffect(() => {
  //   num = test()
  //   console.log('---');

  //   // 放在这只输出一次 0
  //   // document.addEventListener('click', ()=> {
  //   //   console.log(num);
  //   // })
    
  // }, [])
  
  // document.addEventListener('click', ()=> {
  //   // 输出两次 undefined和0  为什么两次且值不一样？
  //   /* 
  //     猜测是Test函数执行了两次，但根据console.log('test')只输出一次说明并不是

  //     调试发现回调函数执行了两次，且中间并没有执行其他操作

  //     放在useEffect里只执行了一次，猜测是因为在组件挂载前后的问题

  //   */
  // //  debugger
  //   console.log(num);
  // })

  /* 
    将num定义和handleClick放在组件函数里，输出10 0

    将num定义在组件函数外：
      将handleClick放在组件函数里，输出两次0
      将handleClick放在组件函数外，只输出一次
  */
  // 总结：不要把不相关的函数和操作放在组件函数里，会变得不幸
  // 放组件外或useEffect里
  // document.addEventListener('click', handleClick)

  // const roomNum = 'G-336'
  // // console.log(roomNum);
  // const [equipment, setEquipment] = useState(null)
  // const [roomName, setRoomName] = useState('')
  // const [roomType, setRoomType] = useState('')
  // // let hotPoints

  // // 执行setState更新状态会造成组件重新渲染，组件重新渲染会再次执行Room函数，所以会无限次执行继而报下面的错误
  // // Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
  // // setIsPopup(true)
  // // let activeHotPoint = null

  // useEffect(() => {

  //   getEquipmentInfo(roomNum).then((res)=> {
  //     // console.log(res);
  //     setEquipment(res.result)
      
  //   }).catch((err)=> {
  //     console.log(err);
  //   })

  //   getRoomInfo(roomNum).then(res=> {
  //     // console.log(res);
  //     setRoomName(res.result.name)
  //     setRoomType(res.result.type)

  //   }).catch(err=> {
  //     console.log(err);
  //   })

  // }, [])

  // const buildingName = 'G'

  const floorOption=['F1','F2','F3','F4','F5','F6']
  // const 
  return (
    <div>
      {/* <Sider ></Sider> */}
      {/* <BF_Sider title='可选楼层' options={['F1','F2','F3','F4','F5','F6']} buildingName={buildingName}></BF_Sider> */}
      {/* <BF_S ider title='可选房间' options={['G-314','G-347','G-324','G-318']}></BF_S> */}
      {/* {equipment!==null && <Card roomName={roomName} roomType={roomType} equipment={equipment}></Card>} */}

      <R_Sider ></R_Sider>
      {/* <Help></Help> */}

    </div>
  )
}
