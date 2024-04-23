import { Button, Checkbox, Divider, Menu, MenuProps, SiderProps, Space, message, theme } from 'antd'
import SidebarWrapper from './SideBarWrapper'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CSSProperties, useEffect, useState } from 'react'
import ImagesBox from '../Image'
import logo from '~/assets/images/logo.svg'
import { LogoutOutlined } from '@ant-design/icons'

import './style.scss'
import { MenuItem, getMenuItem } from '~/utils/helper'
import { navigationMenuItems } from './MenuItems'
import { useDispatch } from 'react-redux'
import { setCalenderModalOpen } from '~/store/features/events'
import { calenderActionItems } from '~/utils/options'
import { logout } from '~/store/features/user'
import { useCalenderSelector, useUserSelector } from '~/store/hooks'
import {
  useDeleteCalenderMutation,
  useGetAllCalenderQuery
} from '~/store/services/calender.service'
import { BsPlus } from 'react-icons/bs'
import { FaChevronDown,FaChevronUp } from "react-icons/fa";


import SubMenu from 'antd/es/menu/SubMenu'
import DropDown from '../DropDown'
import usePermission from '~/hooks/usePermission'
import ConfirmationModal from '../ConfirmationModal'
import { setCalendarIds } from '~/store/features/calender'

interface SidebarProps extends SiderProps {
  setCollapsed: (collapsed: boolean) => void
}

const sidebarContentWrapperStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
}

const childrenWrapperStyles: CSSProperties = {
  height: '80vh',
  overflowY: 'auto'
}

const customTitle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: "95%",

}

const innerDiv :CSSProperties ={
  width: "80%",
  margin: "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}
const customDiv: CSSProperties = {
  display: 'flex',
  justifyContent: "space-between",
  width: "90%",
  margin:" auto",
  alignItems: "center",
  color: "#fff",

}

const SiderBar = ({ collapsible, collapsed, style, setCollapsed, ...rest }: SidebarProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  console.log(pathname)
  const { useToken } = theme
  const { token } = useToken()
  const { colorBgContainer, colorPrimary, colorText } = token
  const [isOpenMenu, setOpenMenu] = useState<string[] | []>([])
  const isCalendarPage = pathname.includes('calender')
  const { user, userPermissions } = useUserSelector()
  const { data } = useGetAllCalenderQuery('')
  const { calendarIds } = useCalenderSelector()
  const { isCalenderManagement } = usePermission()
  const [showAccordion,setShowAccordion] = useState(false)

  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedCalId, setSelectedCalId] = useState('')
  const [deleteCalender] = useDeleteCalenderMutation()

  const SheduleMenuItem = ({ collapsed }: { collapsed: boolean | undefined }) => {
    const [checkedItems, setCheckedItems] = useState<string[]>([])

    useEffect(() => {
      setCheckedItems(calendarIds)
    }, [calendarIds])
    const handleItemClick = (itemKey: string) => {
      const isChecked = checkedItems.includes(itemKey)
      if (isChecked) {
        setCheckedItems(checkedItems.filter((key) => key !== itemKey))
        dispatch(setCalendarIds(checkedItems.filter((key) => key !== itemKey)))
      } else {
        setCheckedItems([...checkedItems, itemKey])
        dispatch(setCalendarIds([...checkedItems, itemKey]))
      }
    }
          /* eslint-disable */

    return (
      <div  className='sidebarMenu'>
        <div
          key='subMenu'
        >
          <div style={customDiv} onClick={()=>
            setShowAccordion((prev) => !prev)}>

             <span style={customTitle}>
              {!collapsed && 'SCHEDULES'}
              <Button className='custom-plus-button' onClick={handleOpenModal}>
                <BsPlus />
                
              </Button>
            </span>
            {showAccordion ? <FaChevronUp/> :  <FaChevronDown/>}
          

            </div>
            {showAccordion &&<div >

          {data?.data?.calendarItems.map((item: ICalender) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
            style={innerDiv}
              key={item._id}
              onClick={() => handleItemClick(item._id)}
              className='sidebarMenu'
            >
              <Checkbox checked={checkedItems.includes(item._id)} />
              <span className='text-white'>{item.name}</span>
              <DropDown
                  dot
                  items={calenderActionItems}
                  onPopupClick={(e) => handleClickItem(e, item._id)}
                  color='white'
                />
            </div>
          ))}
            </div>}

        </div>
      </div>
    )
  }

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

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(setCalenderModalOpen())
  }

  const handleClickItem = (e: any, id: string) => {
    // e.stopPropagation()
    setSelectedCalId(id)
    switch (e.key) {
      case '1':
        console.log('hide this from list')
        break
      case '2':
        console.log('display this only')
        break
      case '3':
        console.log('setting')
        break
      case '4':
        setDeleteModal(true)
        break
      default:
        return null
    }
  }

  const confirmToDelete = () => {
    if (selectedCalId) {
      deleteCalender({ id: selectedCalId })
        .unwrap()
        .then(() => {
          setDeleteModal(false)
          setSelectedCalId('')
          message.success('Calender deleted successfully')
        })
        .catch((err: any) => message.error(err?.data?.error))
    }
  }

  const filterMenuItems = (menuItems: any, permissions: any) => {
    return menuItems.filter((menuItem: any) => {
      const hasPermission = permissions.some((permission: any) =>
        menuItem.permissionKey.includes(permission.key)
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

  let activeKey
  if (pathname.includes('/blueprints-hub')) {
    activeKey = '/blueprints-hub'
  } else if (pathname.includes('/add-group')) {
    activeKey = '/user-and-groups'
  } else {
    activeKey = pathname
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
          </Space>
        </Link>
        <Divider />
        <div style={childrenWrapperStyles} className='scrollbar-hidden'>
          <Menu
            selectedKeys={[activeKey]}
            openKeys={isOpenMenu}
            onOpenChange={onOpenChange}
            items={filteredMenuItems}
            mode='inline'
            className='sidebarMenu'
            onClick={(item) => navigate(item.key)}
          />
          {isCalendarPage && isCalenderManagement && <SheduleMenuItem collapsed={collapsed} />}
        </div>

        <Divider style={{ margin: 0 }} />
        <div className='logoutSidebarMenuWrapper'>
          <Menu items={logoutMenuItem} mode='inline' selectable={false} className='sidebarMenu' />
        </div>
      </div>

      <ConfirmationModal
        title='Delete Confirmation'
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onOk={confirmToDelete}
        message='Are you sure you want to delete this calender?'
      />
    </SidebarWrapper>
  )
}

export default SiderBar
