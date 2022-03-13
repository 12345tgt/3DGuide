export const element = useRoutes([
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