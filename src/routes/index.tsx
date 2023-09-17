import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '~/layout/MainLayout'
import { Dashboard, NotFound, Settings } from '~/pages'

const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'settings', element: <Settings /> }
      ]
    },
    { path: '404', element: <NotFound /> },
    {
      path: '*',
      element: <Navigate to='/404' />
    }
  ])
  return element
}

export default Routes
