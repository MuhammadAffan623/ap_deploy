import { Divider, Menu, SiderProps, Typography, theme } from 'antd'
import SidebarWrapper from './SideBarWrapper'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useUserContext } from '~/context/UserContext'
import { CSSProperties } from 'react'
import ImagesBox from '../Image'
import logo from '~/assets/images/logo.svg'
import { LogoutOutlined } from '@ant-design/icons'

import './style.scss'
import { MenuItem, getMenuItem } from '~/utils/helper'
import { navigationMenuItems } from './MenuItems'

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

const SiderBar = ({ collapsible, collapsed, style, setCollapsed, ...rest }: SidebarProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { logoutUser } = useUserContext()
  const { useToken } = theme
  const { token } = useToken()
  const { colorBgContainer, colorPrimary, colorText, fontSizeHeading1, fontSizeHeading3 } = token

  const logoutMenuItem: MenuItem[] = [
    getMenuItem('Logout', 'logout', <LogoutOutlined rev='rev' />, null, 'menuItem', {}, () => {
      logoutUser()
    })
  ]

  return (
    <SidebarWrapper
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
          <Menu items={logoutMenuItem} mode='inline' selectable={false} className='sidebarMenu' />
        </div>
      </div>
    </SidebarWrapper>
  )
}

export default SiderBar
