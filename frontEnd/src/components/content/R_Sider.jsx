import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

import { Menu } from 'antd';
import { Row, Col } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

// import '../../assets/css/component/sider.css'
import '../../assets/css/component/test.css'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const rootSubmenuKeys = ['sub1'];

/* 
  {
    F1: [],
    F2: []
  }
*/
export default function R_Sider(props) {
  const [openKeys, setOpenKeys] = React.useState([]);

  const navigate = useNavigate()

  let items
  // useEffect(() => {
    console.log(props);

    // const option = props.options.map((item)=> {
    //   let key;
    //   if(item[0]=='F') {
    //     key = `/floor?buildingName=${props.buildingName}&floorNum=${item[1]}`
    //   }else {
    //     key = item
    //   }
    //   return getItem(item, key)
    // })
  
    items = [
      getItem('F1', 'F1', <AppstoreOutlined />, [
        // 对象数组
        getItem('Option 1', '1'),
        getItem('Option 2', '2'),
        getItem('Option 3', '3'),
        getItem('Option 4', '4'),
        getItem('Option 9', '9'),
      ]),
      getItem('F2', 'F2', <AppstoreOutlined />,[
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
        getItem('Option 10', '10'),
      ]),

    ]; // submenu keys of first level
  
    
  
    const onOpenChange = (keys) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };

    const handleClick = ({key}) => {
      console.log(key); //item的key
      // if(key[1]=='f') {
      //   navigate(key)
      // } else {
      //   window.open(`http://localhost:3000/room/${key}`)
      // }
    }

  // }, [])
  

  return (
    <div className='test'>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onSelect={handleClick}
        style={{
          width: 140
        }}
        items={items}
        className='roomMenu'
      />
    </div>
  );
};

// export default () => <Sider />;