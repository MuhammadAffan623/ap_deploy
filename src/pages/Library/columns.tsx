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

export const columns = (
  handleResolve: any,
  handleDelete: any,
  isActionEnabled?: boolean
): ColumnsType<any> => {
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
      title: 'UPDATED',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) => a.updatedAt.length - b.updatedAt.length,
      sortDirections: ['descend'],
      render: ({ updatedAt }) => formatDate(updatedAt)
    },

    {
      title: 'STATUS',
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: (a, b) =>  a?.isActive - b?.isActive,
      sortDirections: ['descend'],
      render: (_, { isActive }) => {
        const text = isActive ? 'Available' : 'Disabled'
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
      render: (_, record) =>
        !isActionEnabled ? (
          ''
        ) : (
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
                <MoreOutlined  style={{ fontSize: '22px' }} />
              </button>
            </Dropdown>
          </Space>
        )
    }
  ]
}
