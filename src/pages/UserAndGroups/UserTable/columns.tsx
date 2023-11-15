import type { ColumnsType } from 'antd/es/table'
import { Dropdown, MenuProps, Space } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { ImagesBox, Pill } from '~/components'
import { CSSProperties } from 'react'
import crossIcon from '~/assets/icons/cross.svg'
import tickIcon from '~/assets/icons/tick.svg'

const btnStyle: CSSProperties = {
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent'
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Mark resolve'
  },
  {
    key: '2',
    label: 'Delete'
  }
]

export const columns = (handleResolve: any, handleDelete: any): ColumnsType<any> => {
  return [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      width: '40%'
    },
    {
      title: 'GROUP',
      dataIndex: 'isBlocked',
      key: 'isBlocked',
      sorter: (a, b) => a.isBlocked.length - b.isBlocked.length,
      sortDirections: ['descend'],
      render: (_, { isBlocked }) => {
        const text = isBlocked ? 'ORLANDO' : 'TEMPA'
        const textColor = isBlocked ? '#F05C54' : '#304FFD'
        const bgColor = isBlocked ? '#F05C541A' : '##304FFD1A'
        return <Pill text={text} textColor={textColor} bgColor={bgColor} />
      }
    },
    {
      title: 'SSO',
      dataIndex: 'isBlocked',
      key: 'isBlocked',
      sorter: (a, b) => a.isBlocked.length - b.isBlocked.length,
      sortDirections: ['descend'],
      render: (_, { isBlocked }) => {
        const img = isBlocked ? tickIcon : crossIcon
        return <ImagesBox src={img} width={20} height={20} />
      }
    },
    {
      title: 'STATUS',
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: (a, b) => a.isActive.length - b.isActive.length,
      sortDirections: ['descend'],
      render: (_, { isActive }) => {
        const text = isActive ? 'Active' : 'Disabled'
        const textColor = isActive ? '#14C25A' : '#FC8229'
        const bgColor = isActive ? '#14C25A1A' : '#FC82291A'
        return <Pill text={text} textColor={textColor} bgColor={bgColor} />
      }
    },
    {
      title: '',
      align: 'left',
      key: '',
      dataIndex: '',
      render: (_, { id }) => (
        <Space size='small'>
          <Dropdown
            menu={{
              items,
              onClick: (params) => {
                const { key, domEvent } = params
                domEvent.stopPropagation()
                if (key === '1') {
                  handleResolve(id)
                } else {
                  handleDelete(id)
                }
              }
            }}
            placement='bottomRight'
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              style={btnStyle}
            >
              <EllipsisOutlined rev />
            </button>
          </Dropdown>
        </Space>
      )
    }
  ]
}
