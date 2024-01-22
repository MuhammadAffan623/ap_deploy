import type { ColumnsType } from 'antd/es/table'
import { Dropdown, MenuProps, Space } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { Pill } from '~/components'
import { CSSProperties } from 'react'
import { formatDate } from '~/utils/helper'

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
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      width: 'max-content',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
      sorter: (a, b) => a.tag.length - b.tag.length,
      sortDirections: ['descend']
    },
    {
      title: 'Sheets',
      dataIndex: 'sheets',
      key: 'sheets',
      sorter: (a, b) => a.sheets.length - b.sheets.length,
      sortDirections: ['descend'],
      render: (_, { sheets }) => sheets.length
    },
    {
      title: 'UPDATED',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) => a.updatedAt.length - b.updatedAt.length,
      sortDirections: ['descend'],
      render: ({ updatedAt }) => formatDate(updatedAt)
    },
    {
      title: 'Version',
      dataIndex: 'sheets',
      key: 'sheets',
      // sorter: (a, b) => a.sheets.length - b.sheets.length,
      // sortDirections: ['descend'],
      render: (_, { sheets }) => {
        if (sheets.length > 0) {
          return sheets[0]?.versions[0]?.labelNumber
        }
        return '--'
      }
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend'],
      render: (_, { status }) => {
        const text = status?.slice(0,1).toUpperCase() + status?.slice(1).toLowerCase()
        const textColor = status === 'active' ? '#14C25A' : status === 'completed'? '#22CCE2' : '#FC8229'
        const bgColor = status === 'active' ? '#14C25A1A' : status === 'completed'? '#22CCE21A' : '#FC82291A'
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
