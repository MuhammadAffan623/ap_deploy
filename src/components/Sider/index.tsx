import { Divider, Menu, SiderProps, Typography, theme } from 'antd'
import Sidebar from './Sidebar/Sidebar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MenuItem, getMenuItem } from '~/utils/helper'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  LogoutOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  DashboardOutlined
} from '@ant-design/icons'
import { useUserContext } from '~/context/UserContext'
import { CSSProperties } from 'react'
import ImagesBox from '../Image/Images'
import logo from '~/assets/images/logo.svg'
import './Sider.scss'

interface SidebarProps extends SiderProps {
  setCollapsed: (collapsed: boolean) => void
}

const sidebarContentWrapperStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
}

const childrenWrapperStyles: CSSProperties = {
  height: '100%'
}

const Sider = ({ collapsible, collapsed, style, setCollapsed, ...rest }: SidebarProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { logoutUser } = useUserContext()
  const { useToken } = theme
  const { token } = useToken()
  const { colorBgContainer, colorPrimary, colorText, fontSizeHeading1, fontSizeHeading3 } = token

  const navigationMenuItems: MenuItem[] = [
    getMenuItem(
      'Dashboard',
      '/dashboard',
      // <ImagesBox src={UsersIcon} />,
      <DashboardOutlined rev='rev' />,
      null,
      'menuItem'
    ),
    getMenuItem(
      'Settings',
      '/settings',
      // <ImagesBox src={MyAccountIcon} />,
      <SettingOutlined rev='rev' />,
      null,
      'menuItem'
    )
  ]

  const logoutMenuItem: MenuItem[] = [
    getMenuItem('Logout', 'logout', <LogoutOutlined rev='rev' />, null, 'menuItem', {}, () => {
      logoutUser()
    })
  ]

  return (
    <Sidebar
      setCollapsed={setCollapsed}
      collapsible={collapsible}
      collapsed={collapsed}
      sidebarStyles={{
        background: colorPrimary,
        backgroundColor: colorPrimary,
        color: colorText,
        maxHeight: '100vh',
        borderRight: `0.5px solid ${colorBgContainer}`,
        ...style
      }}
      drawerStyles={{
        color: colorText,
        background: colorPrimary,
        backgroundColor: colorPrimary,
        borderRight: `0.5px solid ${colorBgContainer}`,

        ...style
      }}
      {...rest}
    >
      <div style={sidebarContentWrapperStyles} className='sidebarContentWrapper'>
        <Link to='/' className='logo center'>
          <ImagesBox src={logo} className='logoImage' />
          <Typography.Text
            style={{ fontSize: collapsed ? fontSizeHeading3 : fontSizeHeading1 }}
            className='logoText'
          >
            {collapsed ? 'Back' : 'APSONE'}
          </Typography.Text>
        </Link>
        <Divider />
        <PerfectScrollbar>
          <div style={childrenWrapperStyles}>
            <Menu
              selectedKeys={[pathname]}
              items={navigationMenuItems}
              mode='inline'
              className='sidebarMenu'
              onClick={(item) => navigate(item.key)}
            />
          </div>
        </PerfectScrollbar>

        <Divider style={{ margin: 0 }} />
        <div className='logoutSidebarMenuWrapper'>
          <Menu items={logoutMenuItem} selectable={false} className='sidebarMenu' />
        </div>
      </div>
    </Sidebar>
  )
}

export default Sider
