import React from 'react';

import { useRoutes } from 'react-router-dom'
import routes from './routes/index'


/* 
  TODO:
  
*/

function App() {
  const element = useRoutes(routes)

  return (
    <div className="App">

        {/* 注册路由，使用路由表后拆分到routes文件夹中*/}
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
