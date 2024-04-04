import { EllipsisOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { CSSProperties } from 'react'
import { Pill } from '~/components'

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
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      // sortDirections: ['descend'],
      width: '40%'
    },
    {
      title: 'GROUP',
      dataIndex: 'group',
      key: 'group',
      sorter: (a, b) => a.group?.name.length - b.group?.name.length,
      // sortDirections: ['descend'],
      render: (_, { group,userType }) => {
        const text =  userType === "Admin" ? "Super Admin" :  group?.name
        const textColor = userType === "Admin" ? "#fd3030" :'#304FFD'
        const bgColor = '#304FFD1A'
        return <Pill text={text} textColor={textColor} bgColor={bgColor} />
      }
    },
    // {
    //   title: 'SSO',
    //   dataIndex: 'isBlocked',
    //   key: 'isBlocked',
    //   // sorter: (a, b) => a.isBlocked.length - b.isBlocked.length,
    //   // sortDirections: ['descend'],
    //   render: (_, { isBlocked }) => {
    //     const img = isBlocked ? tickIcon : crossIcon
    //     return <ImagesBox src={img} width={20} height={20} />
    //   }
    // },
    {
      title: 'STATUS',
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: (a, b) => Number(a.isActive) - Number(b.isActive),
      // sortDirections: ['descend'],
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
              <EllipsisOutlined rev />
            </button>
          </Dropdown>
        </Space>
      )
    }
  ]
}
