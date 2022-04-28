import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/photo/logo-on.png'
import styles from '../../assets/css/component/header.module.css'

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <Link to={"/home"}>
          <img src={logo} alt="西安电子科技大学logo" className={styles.logo}/>
          <p className={styles.describe}>实践教学中心3D导览系统</p>
        </Link>
      </div>
      <div className={styles.placeholder}></div>
    </>
  )
}
