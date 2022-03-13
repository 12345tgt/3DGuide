import React from 'react'
import { Link } from 'react-router-dom'

import southimg from '../../assets/3d_south.jpg'



function handleClick(e) {
  console.log('点击图片');

}

export default function Home() {
  return (
    <Link to="/building">
      {/* 
        TODO:
          图片为等比例放大，如何调整
      */}
      <img src={southimg} alt="南校区3D鸟瞰图" onClick={handleClick} height='100%' />
    </Link>
  )
}
