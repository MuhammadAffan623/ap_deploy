import { MenuProps } from 'antd'
import { DeleteOutlined, SwitcherOutlined } from '@ant-design/icons'

export const itemsActions: MenuProps['items'] = [
  {
    label: 'Delete',
    key: '1',
    icon: <DeleteOutlined rev={false} />
  },
  {
    label: 'Move',
    key: '2',
    icon: <SwitcherOutlined rev={false} />
  }
]
