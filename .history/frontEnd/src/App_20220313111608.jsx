import React from 'react';

import { Link, BrowserRouter, Route, NavLink, Routes, Navigate, useRoutes } from 'react-router-dom'
import routes from './routes/index'


/* 
  TODO:
  首屏home页面展示图片
  点击图片跳转到building页面展示unity
    需要先把unity部署在服务器上然后使用iframe
  点击x楼跳转到x楼页面（使用同一页面，参数不同）
*/

function App() {
  const element = useRoutes(routes)

  return (
    <div className="App">

        {/* 注册路由，使用路由表拆分到routes文件夹中*/}
        {/* <Routes>
          <Route path='/' element={<Navigate to="/home" />} />
          <Route path='/home' element={<Home />} />
          <Route path='/building' element={<Building />} />
          <Route path='/floor/:id' element={<Floor />} />
        </Routes> */}
        {element}
    </div>
  );
}

export default App;
