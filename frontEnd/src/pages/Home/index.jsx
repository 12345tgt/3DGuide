import React from 'react'
import { Link } from 'react-router-dom'

import southImg from '../../assets/3d_south.jpg'
import styles from '../../assets/css/home.module.css';


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
      {/* <div className={styles.box}> */}
        <img src={southImg} className={styles.southImg} alt="南校区3D鸟瞰图" onClick={handleClick} />
      {/* </div> */}
    </Link>
  )
}
