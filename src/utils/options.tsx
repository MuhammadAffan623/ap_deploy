import { DeleteOutlined, SwitcherOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import { BsEye, BsGear, BsTrash } from 'react-icons/bs'

export const itemsActions: MenuProps['items'] = [
  {
    label: 'Delete',
    key: '1',
    icon: <DeleteOutlined  rev='rev'/>
  },
  {
    label: 'Move',
    key: '2',
    icon: <SwitcherOutlined  rev='rev'/>
  }
]

export const calenderActionItems: MenuProps['items'] = [
  {
    label: 'Display this only',
    key: '1',
    icon: <BsEye />
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
