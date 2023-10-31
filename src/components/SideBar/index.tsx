import { Divider, Menu, MenuProps, SiderProps, Space, theme } from 'antd'
import SidebarWrapper from './SideBarWrapper'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useUserContext } from '~/context/UserContext'
import { CSSProperties, useEffect, useState } from 'react'
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
  const { colorBgContainer, colorPrimary, colorText } = token
  const [isOpenMenu, setOpenMenu] = useState<string[] | []>([])

  const logoutMenuItem: MenuItem[] = [
    getMenuItem('Logout', 'logout', <LogoutOutlined rev='rev' />, null, 'menuItem', {}, () => {
      logoutUser()
    })
  ]

  // check on refresh if menu is already opened
  useEffect(() => {
    if (pathname.includes('/forms-hub')) {
      setOpenMenu([`/${pathname.split('/')[1]}`])
    } else {
      setOpenMenu([])
    }
  }, [pathname])

  // submenu keys of first level
  const rootSubmenuKeys = ['/forms-hub']

  const onOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => isOpenMenu.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenMenu(keys)
    } else {
      setOpenMenu(latestOpenKey ? [latestOpenKey] : [])
    }
  }

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
        <Link to='/dashboard' className='logo center'>
          <Space direction={collapsed ? 'vertical' : 'horizontal'}>
            <ImagesBox src={logo} className='logoImage' />
            <span className='logoText'>{collapsed ? '' : 'APSONE'}</span>
          </Space>
        </Link>
        <Divider />
        <PerfectScrollbar>
          <div style={childrenWrapperStyles}>
            <Menu
              selectedKeys={[pathname]}
              openKeys={isOpenMenu}
              onOpenChange={onOpenChange}
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
