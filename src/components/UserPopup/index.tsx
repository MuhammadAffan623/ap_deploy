import { SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import Avatar from '../Avatar'
import { getInitials } from '~/utils/helper'
import './style.scss'
import { Link } from 'react-router-dom'
import dropdownIcon from '~/assets/icons/arrow.svg'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link to='/settings'>Account Settings</Link>,
    icon: <SettingOutlined rev />
  },
  {
    key: '2',
    label: 'Logout',
    icon: <LogoutOutlined rev />
  }
]

const UserPopup = ({ user, sm }: { user: IUser | null; sm: boolean | undefined }) => (
  <Dropdown menu={{ items }}>
    <Space className='userPopupWrapper'>
      <div className='userPopup'>
        <Avatar src={user?.avatarUrl as string} shape='circle'>
          {getInitials(user?.name as string)}
        </Avatar>
        <span className='userName'>{sm ? user?.name : user?.name?.split(' ')[0]}</span>
      </div>
      <img src={dropdownIcon} alt='' width={12} />
    </Space>
  </Dropdown>
)

export default UserPopup
