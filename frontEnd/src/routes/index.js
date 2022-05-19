import { Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Building from '../pages/Building'
import Floor from '../pages/Floor'
import Room from '../pages/Room'

import Test from '../pages/Test'


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
    path: '/building/:buildingName',
    element: <Building />
  },
  {
    // 两种写法都可以，第二种适用于有多个子路由时
    // path: '/floor/:floorNum',
    // element: <Floor />

    // path: '/floor',
    // element: <Floor />,
    // children: [
    //   {
    //     path: ':id',
    //     element: <Floor />
    //   }
    // ]


    // search传参  floor/?buildingName=G&floorNum=3
    path: '/floor',
    element: <Floor />
  },
  {
    // param传参
    path: '/room/:roomNum',
    element: <Room></Room>
  },
  {
    path: '/test',
    element: <Test></Test>
  }
]