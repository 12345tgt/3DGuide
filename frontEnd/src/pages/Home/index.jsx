import React from 'react'
import { Link } from 'react-router-dom'

import southImg from '../../assets/photo/3d_south.jpg'
import styles from '../../assets/css/page/home.module.css';


function handleClick(e) {
  console.log('点击图片');

}

export default function Home() {
  // console.log(10);

  return (
    // 目前只有G楼，暂时写死
      <div className={styles.box}>
        <Link to="/building/G">
          <img src={southImg} className={styles.southImg} alt="南校区3D鸟瞰图" onClick={handleClick} />
        </Link>
      </div>
  )
}
