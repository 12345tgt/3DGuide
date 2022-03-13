import React from 'react';

import { Link, BrowserRouter, Route, NavLink, Routes, Navigate, useRoutes } from 'react-router-dom'

import Home from './pages/Home'
import Building from './pages/Building'
import Floor from './pages/Floor'

/* 
  TODO:
  首屏home页面展示图片
  点击图片跳转到building页面展示unity
    需要先把unity部署在服务器上然后使用iframe
  点击x楼跳转到x楼页面（使用同一页面，参数不同）
*/

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Navigate to="/home" />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/building',
      element: <Building />
    },
    {
      path: '/floor/:id',
      element: <Floor />
    }
  ])


  return (
    <div className="App">
      <BrowserRouter>
        {/* <Link to="/home">Home</Link> */}
        {/* <br></br> */}
        {/* <NavLink to="/building" className={(a)=> {console.log(a)}}>building</NavLink> */}
        {/* <NavLink to="/building" className={({ isActive }) => isActive ? 'newActive' : ''}>building</NavLink> */}

        {/* 注册路由 */}
        {/* <Routes>
          <Route path='/' element={<Navigate to="/home" />} />
          <Route path='/home' element={<Home />} />
          <Route path='/building' element={<Building />} />
          <Route path='/floor/:id' element={<Floor />} />
        </Routes> */}
        {element}
      </BrowserRouter>
    </div>
  );
}

export default App;
