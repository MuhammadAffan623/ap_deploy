import { MenuProps } from 'antd'
import { DeleteOutlined, SwitcherOutlined } from '@ant-design/icons'
import { BsEye, BsEyeSlash, BsGear, BsTrash } from 'react-icons/bs'

export const itemsActions: MenuProps['items'] = [
  {
    label: 'Delete',
    key: '1',
    icon: <DeleteOutlined  />
  },
  {
    label: 'Move',
    key: '2',
    icon: <SwitcherOutlined  />
  }
]

export const calenderActionItems: MenuProps['items'] = [
  {
    label: 'Display this only',
    key: '1',
    icon: <BsEye />
  },
  {
    label: 'Hide this from list',
    key: '2',
    icon: <BsEyeSlash />
  },
  {
    label: 'Settings',
    key: '3',
    icon: <BsGear />
  },
  {
    type: 'divider'
  },
  {
    label: 'Delete Calendar',
    key: '4',
    icon: <BsTrash />
  },
  {
    type: 'divider'
  }
]
