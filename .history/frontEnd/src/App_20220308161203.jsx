import React from 'react';

import {Link, BrowserRouter, Route, NavLink, Routes} from 'react-router-dom'

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

        {/* 注册路由 */}
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/building' element={<Building/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
