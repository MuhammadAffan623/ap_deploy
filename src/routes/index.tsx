import { Navigate, useRoutes } from 'react-router-dom'
import AuthLayout from '~/layout/AuthLayout'
import MainLayout from '~/layout/MainLayout'
import {
  BlueprintsHub,
  Calender,
  Contacts,
  Dashboard,
  DeviceManagement,
  Forms,
  Library,
  LibraryView,
  Login,
  NotFound,
  ResetPassword,
  Settings,
  Templates,
  UserAndGroups,
  AddGroup,
  PDFEditor
} from '~/pages'
import DetailProject from '~/pages/BlueprintsHub/DetailProject'
import PublicRoutes from './PublicRoutes'
import ProtectedRoute from './ProtectedRoutes'
import { useEffect } from 'react'
import { useGetUserFromTokenMutation } from '~/store/services/auth.services'

const Routes = () => {
  const [fetchUserFromToken] = useGetUserFromTokenMutation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserFromToken(token)
    }
  }, [])

  const element = useRoutes([
    {
      path: '/',
      element: <Navigate to='login' />
    },
    {
      path: '/',
      element: <PublicRoutes navLink='/dashboard' component={AuthLayout} />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'reset-password', element: <ResetPassword /> }
      ]
    },
    {
      path: '/',
      element: <ProtectedRoute navLink='/login' component={MainLayout} />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'calender', element: <Calender /> },
        { path: 'contacts', element: <Contacts /> },
        { path: 'library', element: <Library /> },
        { path: 'library-view', element: <LibraryView /> },
        {
          path: 'blueprints-hub',
          children: [
            { path: 'detail-project', element: <DetailProject /> },
            { path: '', element: <BlueprintsHub /> }
          ]
        },
        { path: 'device-management', element: <DeviceManagement /> },
        { path: 'user-and-groups', element: <UserAndGroups /> },
        { path: 'add-group', element: <AddGroup /> },
        { path: 'settings', element: <Settings /> },
        { path: 'forms-hub/templates', element: <Templates /> },
        { path: 'forms-hub/forms', element: <Forms /> }
      ]
    },
    { path: 'editor', element: <PDFEditor /> },
    { path: '404', element: <NotFound /> },
    {
      path: '*',
      element: <Navigate to='/404' />
    }
  ])
  return element
}

export default Routes
