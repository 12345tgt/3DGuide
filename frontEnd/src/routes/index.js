import { Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Building from '../pages/Building'
import Floor from '../pages/Floor'
import Room from '../pages/Room'
import Floor3 from '../pages/Floor3'


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
  },
  {
    path: '/room/:num',
    element: <Room></Room>
  },
  {
    path: '/test',
    element: <Floor3></Floor3>
  }
]