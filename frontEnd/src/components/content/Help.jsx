// 帮助组件,悬浮提示unity操作
import React from 'react'
import { Popover, Button } from 'antd';

import icon from '../../assets/photo/help.svg'
import styles from '../../assets/css/component/help.module.css'

export default function Help() {
  const content = (
    <div>
      <p>鼠标左键旋转相机</p>
      <p>鼠标右键旋转模型</p>
      <p>鼠标中键移动相机，滚轮控制缩放</p>
      <p>键盘控制使用w a s d或↑ ↓ ← →，按下shift键加速</p>
      <p>按下空格键复位</p>
    </div>
  );

  return (
    <div>
      
      <Popover placement="topRight" arrowPointAtCenter content={content} title="操作提示">
        <img src={icon} alt="" className={styles.icon}/>
      </Popover>
    </div>
  )
}
