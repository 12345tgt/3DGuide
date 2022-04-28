import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

import '../../assets/css/component/sider.css'

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

// [F1,F2,...], [G-101,G-102,...]
// 路由： floor1  room/G-101
export default function BF_Sider(props) {
  const [openKeys, setOpenKeys] = React.useState([]);

  const navigate = useNavigate()

  let items
  console.log(props);

  const option = props.options.map((item)=> {
    let key;
    if(item[0]=='F') {
      key = `/floor?buildingName=${props.buildingName}&floorNum=${item[1]}`
    }else {
      key = item
    }
    return getItem(item, key)
  })

  items = [
    getItem(props.title, 'sub1', <AppstoreOutlined />, option)
  ]; // submenu keys of first level

  

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const handleSelect = ({key}) => {
    console.log(key); //item的key
    if(key[1]=='f') {
      navigate(key)
    } else {
      window.open(`http://localhost:3000/room/${key}`)
    }
  }
  

  return (
    <div className='BF_Box'>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onSelect={handleSelect}
        style={{
          width: 140
        }}
        items={items}
      />
    </div>
  );
};

// export default () => <Sider />;