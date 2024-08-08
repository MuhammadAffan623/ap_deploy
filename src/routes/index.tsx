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
  AddEditGroup
} from '~/pages'
import DetailProject from '~/pages/BlueprintsHub/DetailProject'
import PublicRoutes from './PublicRoutes'
import ProtectedRoute from './ProtectedRoutes'
import { useEffect } from 'react'
import { useGetUserFromTokenMutation } from '~/store/services/auth.services'
import { PermissionEnums } from '~/enums/permission'
import { useUserSelector } from '~/store/hooks'
import { Loader } from '~/components'
import Pdfme from '~/components/Pdfme'

const dynamicRoutes = [
  { path: 'dashboard', element: <Dashboard /> },
  {
    path: 'forms-hub/templates',
    element: <Templates />,
    permissionkey: [PermissionEnums.USER_FORM_TEMPLATES, PermissionEnums.MANAGEMENT_FORMS_HUB]
  },
  {
    path: 'forms-hub/forms',
    element: <Forms />,
    permissionkey: [PermissionEnums.USER_FORMS, PermissionEnums.MANAGEMENT_FORMS_HUB]
  },
  {
    path: 'calender',
    element: <Calender />,
    permissionkey: [PermissionEnums.USER_CALENDAR, PermissionEnums.MANAGEMENT_CALENDAR]
  },
  {
    path: 'contacts',
    element: <Contacts />,
    permissionkey: [PermissionEnums.USER_CONTACTS, PermissionEnums.MANAGEMENT_CONTACTS]
  },
  {
    path: 'library',
    element: <Library />,
    permissionkey: [PermissionEnums.USER_LIBRARY, PermissionEnums.MANAGEMENT_LIBRARY]
  },
  { path: 'library-view', element: <LibraryView /> },
  {
    path: 'blueprints-hub',
    children: [
      { path: '', element: <BlueprintsHub /> },
      { path: ':id', element: <DetailProject /> }
    ],
    permissionkey: [PermissionEnums.USER_PROJECTS, PermissionEnums.MANAGEMENT_BLUEPRINTS_HUB]
  },
  {
    path: 'device-management',
    element: <DeviceManagement />,
    permissionkey: [PermissionEnums.MANAGEMENT_DEVICE_MANAGEMENT]
  },
  {
    path: 'user-and-groups',
    element: <UserAndGroups />,
    permissionkey: [PermissionEnums.MANAGEMENT_USERS_GROUPS]
  },
  {
    path: 'user-and-groups/:id',
    element: <AddEditGroup />,
    permissionkey: [PermissionEnums.MANAGEMENT_USERS_GROUPS]
  },
  {
    path: 'add-group',
    element: <AddEditGroup />,
    permissionkey: [PermissionEnums.MANAGEMENT_USERS_GROUPS]
  },
  {
    path: 'settings',
    element: <Settings />,
    permissionkey: [PermissionEnums.MANAGEMENT_SETTINGS]
  },
  {
    path: 'editor',
    element: <Pdfme />,
    permissionkey: [PermissionEnums.USER_FORMS, PermissionEnums.MANAGEMENT_FORMS_HUB]
  }
]

const Routes = () => {
  const [fetchUserFromToken, { isLoading }] = useGetUserFromTokenMutation()
  const { user, userPermissions } = useUserSelector() as any

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserFromToken(token)
    }
  }, [])

  const filterRoutes = dynamicRoutes.filter((item) =>
    userPermissions.some((permission: any) => item.permissionkey?.includes(permission.key))
  )
  const filteredRoutes = user?.userType === 'User' ? filterRoutes : dynamicRoutes
  const afterLoginRoute = filteredRoutes[0]?.path

  const element = useRoutes([
    {
      path: '/',
      element: <Navigate to='login' />
    },
    {
      path: '/',
      element: <PublicRoutes navLink={afterLoginRoute} component={AuthLayout} />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'reset-password', element: <ResetPassword /> }
      ]
    },
    {
      path: '/',
      element: <ProtectedRoute navLink='/login' component={MainLayout} />,
      children: filteredRoutes
    },
    { path: 'editor', element: <Pdfme /> },
    { path: '404', element: <NotFound /> },
    {
      path: '*',
      element: <Navigate to='/404' />
    }
  ])

  if (isLoading) {
    return <Loader fullScreen />
  }

  return element
}

export default Routes
