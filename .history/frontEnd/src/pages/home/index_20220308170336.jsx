import React from 'react'
import southimg from '../../assets/3d_south.jpg'

function handleClick(e) {
  console.log('点击图片');
}

export default function Home() {
  return (
    <img src={southimg} alt="南校区3D鸟瞰图" onClick={handleClick}/>
  )
}
