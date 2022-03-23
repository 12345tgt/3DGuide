import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import Room from '../Room/index'

export default function Floor() {
  const { id } = useParams()

  function handleJumpRoom (e) {
    try {
      console.log("floor",e.data);
      let data, newPage, contr;
      typeof e.data == 'string' ? data = e.data.substr(e.data.length-3) : data = '';


      console.log(data,!isNaN(Number(data)));
      if(data!=='' && !isNaN(Number(data))) {
        newPage = window.open(`http://localhost:3000/room/${data}`)
      }

      // switch (data) {
      //   case '101':
      //     newPage = window.open('http://localhost:3000/room/101')
      //     // console.log(newPage);
      //     // console.log(newPage.document.body);
      //     // contr = document.createElement('div')
      //     // newPage.document.body.appendChild(contr)

      //     break;
      //   case '102':
      //     // 跳转到一层界面

      //     break;
      //   case '103':
      //     // 跳转到一层界面

      //     break;
      // }

    } catch (err) {
      console.log(err);
    }
  }

  // window.addEventListener('message', handleJumpRoom)
  window.onmessage = handleJumpRoom;

  // useEffect(() => {
  
  //   return () => {
  //     // window.removeEventListener('message', handleJumpRoom)
  //   }
  // }, [])
  

  return (
    id === '01' || id ==='03' ? <iframe src={`http://47.108.179.245:8088/floor${id}`} frameBorder="0" width='1400' height='600'></iframe> : <div>Floor {id} </div>
  )
}
