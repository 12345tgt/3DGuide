import React from 'react'

import styles from '../../assets/css/component/footer.module.css'

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <span className={styles.copyright}>版权信息：copyright© 西安电子科技大学版权所有 地址：西安市雁塔区太白南路2号/长安区西沣路266号</span>
      </div>
      <div className={styles.placeholder}></div>
    </>
  )
}
