import { MenuItem, getMenuItem } from '~/utils/helper'
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import { RxDashboard, RxLayers, RxFileText, RxCalendar, RxDotFilled } from 'react-icons/rx'
import { AiOutlineMobile } from 'react-icons/ai'
import { BsFolder2 } from 'react-icons/bs'
import { PermissionEnums } from '~/enums/permission'

export const navigationMenuItems: MenuItem[] = [
  getMenuItem('Dashboard', '/dashboard', '', <RxDashboard size={20} />, null, 'menuItem'),
  getMenuItem(
    'Forms Hub',
    '/forms-hub',
    PermissionEnums.USER_FORMS_HUB,
    <RxFileText size={20} />,
    [
      getMenuItem(
        'Templates',
        '/forms-hub/templates',
        PermissionEnums.USER_FORM_TEMPLATES,
        <RxDotFilled size={20} />,
        null,
        'menuItem'
      ),
      getMenuItem(
        'Forms',
        '/forms-hub/forms',
        PermissionEnums.USER_FORMS,
        <RxDotFilled size={20} />,
        null,
        'menuItem'
      )
    ],
    'menuItem'
  ),
  getMenuItem(
    'Calender',
    '/calender',
    PermissionEnums.USER_CALENDAR,
    <RxCalendar size={20} />,
    null,
    'menuItem'
  ),
  getMenuItem(
    'Contacts',
    '/contacts',
    PermissionEnums.USER_CONTACTS,
    <AiOutlineMobile size={20} />,
    null,
    'menuItem'
  ),
  getMenuItem(
    'Library',
    '/library',
    PermissionEnums.USER_LIBRARY,
    <BsFolder2 size={20} />,
    null,
    'menuItem'
  ),
  getMenuItem(
    'Blueprints Hub',
    '/blueprints-hub',
    PermissionEnums.USER_PROJECTS,
    <RxLayers size={20} />,
    null,
    'menuItem'
  ),
  getMenuItem(
    'Device Management',
    '/device-management',
    PermissionEnums.MANAGEMENT_DEVICE_MANAGEMENT,
    <AiOutlineMobile size={20} />,
    null,
    'menuItem'
  ),
  getMenuItem(
    'User & Groups',
    '/user-and-groups',
    PermissionEnums.MANAGEMENT_USERS_GROUPS,
    <UserOutlined rev={false} />,
    null,
    'menuItem'
  ),
  getMenuItem(
    'Settings',
    '/settings',
    PermissionEnums.MANAGEMENT_SETTINGS,
    <SettingOutlined rev='rev' />,
    null,
    'menuItem'
  )
]
