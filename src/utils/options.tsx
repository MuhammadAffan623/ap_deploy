import { DeleteOutlined, SwitcherOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import { BsEye, BsGear, BsTrash } from 'react-icons/bs'
import RevIcon from '~/components/RevIcons'

export const itemsActions: MenuProps['items'] = [
  {
    label: 'Delete',
    key: '1',
    icon: (
      <RevIcon rev='rev'>
        <DeleteOutlined />
      </RevIcon>
    )
  },
  {
    label: 'Move',
    key: '2',
    icon: (
      <RevIcon rev='rev'>
        <SwitcherOutlined />
      </RevIcon>
    )
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
