import React from 'react';

import {Link, BrowserRouter, Route, NavLink, Routes, Navigate} from 'react-router-dom'

import Home from './pages/Home'
import Building from './pages/Building'

/* 
  TODO:
  首屏home页面展示图片
  点击图片跳转到building页面展示unity
  点击x楼跳转到x楼页面（使用同一页面，参数不同）
*/

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/home">跳转1</Link>
        <b></b>
        <NavLink to="/building">跳转2</NavLink>

        {/* 注册路由 */}
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>}/>
          <Route path='home' element={<Home/>}/>
          <Route path='/building' element={<Building/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
