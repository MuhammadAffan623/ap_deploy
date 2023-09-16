import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '~/layout/MainLayout'
import { Dashboard, NotFound } from '~/pages'

const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [{ path: '', element: <Dashboard /> }]
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
