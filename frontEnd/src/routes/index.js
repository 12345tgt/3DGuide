import { Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Building from '../pages/Building'
import Floor from '../pages/Floor'

export default [
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
    // 两种写法都可以，第二种适用于有多个子路由时
    path: '/floor/:id',
    element: <Floor />

    // path: '/floor',
    // element: <Floor />,
    // children: [
    //   {
    //     path: ':id',
    //     element: <Floor />
    //   }
    // ]
  }
]