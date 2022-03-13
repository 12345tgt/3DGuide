import React from 'react'
import { Link, BrowserRouter, Route, NavLink, Routes, Navigate } from 'react-router-dom'

import southimg from '../../assets/3d_south.jpg'



function handleClick(e) {
  console.log('点击图片');

}

export default function Home() {
  return (
    <Link to="/building">
      <img src={southimg} alt="南校区3D鸟瞰图" onClick={handleClick}/>
    </Link>
  )
}
