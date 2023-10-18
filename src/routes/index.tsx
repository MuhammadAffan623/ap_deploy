import { Navigate, useRoutes } from 'react-router-dom'
import AuthLayout from '~/layout/AuthLayout'
import MainLayout from '~/layout/MainLayout'
import { Dashboard, Login, NotFound, ResetPassword, Settings } from '~/pages'

const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Navigate to='login' />
    },
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'reset-password', element: <ResetPassword /> }
      ]
    },
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
