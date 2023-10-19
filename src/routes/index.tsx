import { Navigate, useRoutes } from 'react-router-dom'
import AuthLayout from '~/layout/AuthLayout'
import MainLayout from '~/layout/MainLayout'
import {
  BlueprintsHub,
  Calender,
  Contacts,
  Dashboard,
  DeliveryActivity,
  DeviceManagement,
  Forms,
  Library,
  Login,
  NotFound,
  PublicForms,
  ResetPassword,
  Settings,
  Templates,
  UserAndGroups
} from '~/pages'

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
        { path: 'calender', element: <Calender /> },
        { path: 'contacts', element: <Contacts /> },
        { path: 'library', element: <Library /> },
        { path: 'blueprints-hub', element: <BlueprintsHub /> },
        { path: 'device-management', element: <DeviceManagement /> },
        { path: 'user-and-groups', element: <UserAndGroups /> },
        { path: 'settings', element: <Settings /> },
        { path: 'forms-hub/templates', element: <Templates /> },
        { path: 'forms-hub/forms', element: <Forms /> },
        { path: 'forms-hub/public-forms', element: <PublicForms /> },
        { path: 'forms-hub/delivery-activity', element: <DeliveryActivity /> }
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
