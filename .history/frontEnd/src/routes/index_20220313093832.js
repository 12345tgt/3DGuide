import { Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Building from '../pages/Building'
import Floor from '../pages/Floor'

export default element = useRoutes([
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
    // path: '/floor/:id',
    // element: <Floor />

    path: '/floor',
    element: <Floor />,
    children: [
      {
        path: ':id',
        element: <Floor />
      }
    ]
  }
])