import type { ColumnsType } from 'antd/es/table'
import { Dropdown, MenuProps, Space } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
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
  isActionManagement?: boolean
): ColumnsType<any> => {
  return [
    {
      title: 'FORM NAME',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      sorter: (a, b) => a.owner.length - b.owner.length,
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
      title: 'VERSION',
      dataIndex: 'version',
      key: 'version',
      sorter: (a, b) => a.version - b.version,
      sortDirections: ['descend'],
      render: (_, { file }) => file?.versions[0]?.labelNumber ?? '--'
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend'],
      render: (_, { status }) => {
        const text = status
        const textColor = status === 'Completed' ? '#14C25A' : '#FC8229'
        const bgColor = status === 'Completed' ? '#14C25A1A' : '#FC82291A'
        return <Pill text={text} textColor={textColor} bgColor={bgColor} />
      }
    },
    {
      title: '',
      align: 'left',
      key: '',
      dataIndex: '',
      render: (_, record) =>
        !isActionManagement ? (
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
                <EllipsisOutlined  />
              </button>
            </Dropdown>
          </Space>
        )
    }
  ]
}

export const Bluecolumns = (handleResolve: any, handleDelete: any): ColumnsType<any> => {
  return [
    {
      title: 'PROJECT NAME',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'TAGS',
      dataIndex: 'tags',
      key: 'tags',
      sorter: (a, b) => a.tags.length - b.tags.length,
      sortDirections: ['descend'],
      render: (_, { status }) => {
        const text = status ? 'ORL' : 'WPB'
        const textColor = status ? '#14C25A' : '#FC8229'
        const bgColor = status ? '#14C25A1A' : '#FC82291A'
        return <Pill text={text} textColor={textColor} bgColor={bgColor} />
      }
    },
    {
      title: 'SHEET',
      dataIndex: 'sheet',
      key: 'sheet',
      sorter: (a, b) => a.sheet.length - b.sheet.length,
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
      title: 'VERSION',
      dataIndex: 'version',
      key: 'version',
      sorter: (a, b) => a.version.length - b.version.length,
      sortDirections: ['descend']
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend'],
      render: (_, { status }) => {
        const text = status ? 'Completed' : 'Draft'
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
              <EllipsisOutlined  />
            </button>
          </Dropdown>
        </Space>
      )
    }
  ]
}

export const BlueProjectcolumns = (handleResolve: any, handleDelete: any): ColumnsType<any> => {
  return [
    {
      title: 'SHEET NAME',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'TAGS',
      dataIndex: 'tags',
      key: 'tags',
      sorter: (a, b) => a.tags.length - b.tags.length,
      sortDirections: ['descend'],
      render: (_, { status }) => {
        const text = status ? 'ORL' : 'WPB'
        const textColor = status ? '#14C25A' : '#FC8229'
        const bgColor = status ? '#14C25A1A' : '#FC82291A'
        return <Pill text={text} textColor={textColor} bgColor={bgColor} />
      }
    },

    {
      title: 'VERSION',
      dataIndex: 'version',
      key: 'version',
      sorter: (a, b) => a.version.length - b.version.length,
      sortDirections: ['descend']
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
              <EllipsisOutlined  />
            </button>
          </Dropdown>
        </Space>
      )
    }
  ]
}
