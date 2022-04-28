import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'

// import styles from '../../assets/css/popup.module.css'
import '../../assets/css/component/popup.css'
import constant from '../../pages/Room/constant'

/* 
  TODO:
    使用proptypes对prop进行限制

*/

export default function Popup(props) {
  const [title, setTitle] = useState(props.detail.title)  //标题
  const [describe, setDescribe] = useState(props.detail.describe) //具体内容
  const [isModalVisible, setIsModalVisible] = useState(props.isPopup);
  const [footerNum, setFooterNum] = useState(props.footerNum) //button数量

  // console.log(props);
  // console.log('isModalVisible',isModalVisible);
  // console.log(describe);

  const handleOk = () => {
    setIsModalVisible(false);
    props.setIsPopup(false)
    constant.setPopup()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    props.setIsPopup(false)
    constant.setPopup()
  };

  useEffect(()=> {
    setTitle(props.detail.title)
    setDescribe(props.detail.describe)
    setFooterNum(props.footerNum)
    setIsModalVisible(props.isPopup);
  }, [props])

  // prop footer 1:只有确认，2: 确认和取消
  let button = [
    <Button key="ok" onClick={handleOk}>
      确认
    </Button>,
    <Button key="cancel" onClick={handleCancel}>
      取消
    </Button>,
  ]
  let footer
  footerNum!==0 ? footer = button.slice(0, footerNum) : footer = null
  

  return (
    // <div>popup {props}</div>
    <div>
      {/* 使用组件 */}
      <Modal 
        title={title} 
        visible={isModalVisible} 
        footer={footer}
        onCancel={handleCancel}
        maskClosable={false}
        // centered={true}  //在页面上垂直居中显示Modal
      >
        {describe.map((item, index) => {
          return (
            <p key={index}>{item}</p>
          )
        })}
      </Modal>



      {/* 手写 */}
      {/* 背景遮罩层 */}
      {/* <div className={styles.background}></div> */}
      {/* <div className={styles.popup}>
        <strong className={styles.close}>关闭</strong>
        <div className={styles.title}>
          <p>{title}</p>
        </div>
        <div className={styles.content}>
          数组循环
          {describe.map((item, index)=> {
             return (
               <p key={index}>{item}</p>
             ) 
            })}
        </div>
        <div className={styles.button}>
          <button>确认</button>
          <button>取消</button>
        </div>
      </div> */}
    </div>
  )
}
