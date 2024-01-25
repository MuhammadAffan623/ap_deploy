import { Checkbox, Divider, Menu, MenuProps, SiderProps, Space, Typography, theme } from 'antd'
import SidebarWrapper from './SideBarWrapper'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { CSSProperties, useEffect, useState } from 'react'
import ImagesBox from '../Image'
import logo from '~/assets/images/logo.svg'
import { LogoutOutlined } from '@ant-design/icons'

import './style.scss'
import { MenuItem, getMenuItem } from '~/utils/helper'
import { navigationMenuItems } from './MenuItems'
import Button from '../Button'
import { BsPlus } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { setCalenderModalOpen } from '~/store/features/events'
import DropDown from '../DropDown'
import { calenderActionItems } from '~/utils/options'
import { logout } from '~/store/features/user'
import { useUserSelector } from '~/store/hooks'

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
  const { useToken } = theme
  const { token } = useToken()
  const { colorBgContainer, colorPrimary, colorText } = token
  const [isOpenMenu, setOpenMenu] = useState<string[] | []>([])
  const dispatch = useDispatch()
  const isCalendarPage = pathname.includes('calender')
  const { user, userPermissions } = useUserSelector()

  const logoutMenuItem: MenuItem[] = [
    getMenuItem('Logout', 'logout', '', <LogoutOutlined rev='rev' />, null, 'menuItem', {}, () => {
      dispatch(logout())
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
    const latestOpenKey = keys.find((key) => isOpenMenu.indexOf(key as never) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenMenu(keys)
    } else {
      setOpenMenu(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const handleOpenModal = () => {
    dispatch(setCalenderModalOpen())
  }

  const handleClickItem = (key: string) => {
    console.log('handleClickItem key: ', key)
  }

  const filterMenuItems = (menuItems: any, permissions: any) => {
    return menuItems.filter((menuItem: any) => {
      const hasPermission = permissions.some(
        (permission: any) => permission.key === menuItem.permissionKey
      )

      if (hasPermission) {
        // If the menuItem has children, recursively filter them
        if (menuItem.children && menuItem.children.length > 0) {
          menuItem.children = filterMenuItems(menuItem.children, permissions)
        }

        return true
      }

      return false
    })
  }

  // Use the recursive function to filter navigationMenuItems
  const filteredMenuItems =
    user?.userType === 'User'
      ? filterMenuItems(navigationMenuItems, userPermissions)
      : navigationMenuItems

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
          </Space>
        </Link>
        <Divider />
        <PerfectScrollbar>
          <div style={childrenWrapperStyles}>
            <Menu
              selectedKeys={[pathname]}
              openKeys={isOpenMenu}
              onOpenChange={onOpenChange}
              items={filteredMenuItems}
              mode='inline'
              className='sidebarMenu'
              onClick={(item) => navigate(item.key)}
            />
          </div>
        </PerfectScrollbar>

        {isCalendarPage && (
          <div style={{ height: '340px', overflow: 'auto' }} className='scrollbar-hidden'>
            <div className='schedule-wrapper'>
              <Typography.Text className='sidebar-schedules'>SCHEDULES</Typography.Text>
              <Button type='text' onClick={handleOpenModal}>
                <BsPlus color='white' fontSize={18} />
              </Button>
            </div>
            {[1, 2, 3].map((item, index) => (
              <div className='sidebar-checkbox' key={index}>
                <Checkbox name={`calendar-${item}`} style={{ color: 'white' }}>
                  Calender {item}
                </Checkbox>

                <DropDown
                  dot
                  items={calenderActionItems}
                  handleClickItem={handleClickItem}
                  color='white'
                />
              </div>
            ))}
          </div>
        )}

        <Divider style={{ margin: 0 }} />
        <div className='logoutSidebarMenuWrapper'>
          <Menu items={logoutMenuItem} mode='inline' selectable={false} className='sidebarMenu' />
        </div>
      </div>
    </SidebarWrapper>
  )
}

export default SiderBar
