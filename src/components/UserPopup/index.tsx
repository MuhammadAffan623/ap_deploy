import { SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import Avatar from '../Avatar'
import { getInitials } from '~/utils/helper'
import './style.scss'
import { Link } from 'react-router-dom'
import dropdownIcon from '~/assets/icons/arrow.svg'
import { logout } from '~/store/features/user'
import { useDispatch } from 'react-redux'
import usePermission from '~/hooks/usePermission'
import RevIcon from '../RevIcons'

const UserPopup = ({ user, sm }: { user: IUser | null; sm: boolean | undefined }) => {
  const dispatch = useDispatch()
  const { isSettingsManagement } = usePermission()

  const items: MenuProps['items'] = [
    isSettingsManagement
      ? {
          key: '1',
          label: <Link to='/settings'>Account Settings</Link>,
          icon: (
            <RevIcon rev='rev'>
              <SettingOutlined />
            </RevIcon>
          )
        }
      : null,
    {
      key: '2',
      label: 'Logout',
      icon: (
        <RevIcon rev='rev'>
          <LogoutOutlined />
        </RevIcon>
      ),
      onClick: () => dispatch(logout())
    }
  ]

  return (
    <Dropdown menu={{ items }}>
      <Space className='userPopupWrapper'>
        <div className='userPopup'>
          <Avatar src={user?.avatar as string} shape='circle'>
            {getInitials(user?.name as string)}
          </Avatar>
          <span className='userName'>{sm ? user?.name : user?.name?.split(' ')[0]}</span>
        </div>
        <img src={dropdownIcon} alt='' width={12} />
      </Space>
    </Dropdown>
  )
}

export default UserPopup
