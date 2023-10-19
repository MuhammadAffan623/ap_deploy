import { MenuItem, getMenuItem } from '~/utils/helper'
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import { RxDashboard, RxLayers, RxFileText, RxCalendar, RxDotFilled } from 'react-icons/rx'
import { AiOutlineMobile } from 'react-icons/ai'
import { BsFolder2 } from 'react-icons/bs'

export const navigationMenuItems: MenuItem[] = [
  getMenuItem(
    'Dashboard',
    '/dashboard',
    // <ImagesBox src={UsersIcon} />,
    <RxDashboard size={20} />,
    null,
    'menuItem'
  ),
  getMenuItem(
    'Forms Hub',
    '/forms-hub',
    <RxFileText size={20} />,
    [
      getMenuItem('Templates', '/templates', <RxDotFilled size={20} />, null, 'menuItem',),
      getMenuItem('Forms', '/forms', <RxDotFilled size={20} />, null, 'menuItem'),
      getMenuItem('Public Forms', '/public-forms', <RxDotFilled size={20} />, null, 'menuItem'),
      getMenuItem(
        'Delivery Activity',
        '/delivery-activity',
        <RxDotFilled size={20} />,
        null,
        'menuItem'
      )
    ],
    'menuItem'
  ),
  getMenuItem('Calender', '/calender', <RxCalendar size={20} />, null, 'menuItem'),
  getMenuItem('Contacts', '/contacts', <AiOutlineMobile size={20} />, null, 'menuItem'),
  getMenuItem('Library', '/library', <BsFolder2 size={20} />, null, 'menuItem'),
  getMenuItem('Blueprints Hub', '/blueprints-hub', <RxLayers size={20} />, null, 'menuItem'),
  getMenuItem(
    'Device Management',
    '/device-management',
    <AiOutlineMobile size={20} />,
    null,
    'menuItem'
  ),
  getMenuItem('User & Groups', '/user-and-groups', <UserOutlined rev={false} />, null, 'menuItem'),
  getMenuItem(
    'Settings',
    '/settings',
    // <ImagesBox src={MyAccountIcon} />,
    <SettingOutlined rev='rev' />,
    null,
    'menuItem'
  )
]
