import type { ColumnsType } from 'antd/es/table'
import { Dropdown, MenuProps, Space } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { Pill } from '~/components'
import { CSSProperties } from 'react'

const btnStyle: CSSProperties = {
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent'
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Edit'
  },
  {
    key: '2',
    label: 'Delete'
  }
]

export const columns = (handleResolve: any, handleDelete: any): ColumnsType<any> => {
  return [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 'max-content',
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ['descend']
    },
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.length - b.category.length,
      sortDirections: ['descend']
    },

    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend'],
      render: (_, { status }) => {
        const text = status ? 'Available' : 'Disabled'
        const textColor = status ? '#14C25A' : '#FC8229'
        const bgColor = status ? '#14C25A1A' : '#FC82291A'
        return <Pill text={text} textColor={textColor} bgColor={bgColor} />
      }
    },
    {
      title: '',
      align: 'left',
      key: '',
      dataIndex: '',
      render: (_, record) => (
        <Space size='small'>
          <Dropdown
            menu={{
              items,
              onClick: (params) => {
                const { key, domEvent } = params
                domEvent.stopPropagation()
                if (key === '1') {
                  handleResolve(record)
                } else {
                  handleDelete(record?._id)
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
              <MoreOutlined rev style={{ fontSize: '22px' }} />
            </button>
          </Dropdown>
        </Space>
      )
    }
  ]
}
