import type { ColumnsType } from 'antd/es/table'
import { Button, Space } from 'antd'
import { Pill } from '~/components'
import { formatDate } from '~/utils/helper'
import { AiOutlineDelete } from 'react-icons/ai'

export const columns = (handleDelete: any, isActionEnabled?: boolean): ColumnsType<any> => {
  return [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'MAKE/MODEL',
      dataIndex: 'deviceMake',
      key: 'deviceMake',
      sorter: (a, b) => a.deviceMake.length - b.deviceMake.length,
      sortDirections: ['descend']
    },
    {
      title: 'Last SYNC',
      dataIndex: 'lastSync',
      key: 'lastSync',
      sorter: (a, b) => a.lastSync.length - b.lastSync.length,
      sortDirections: ['descend'],
      render: ({ lastSync }) => formatDate(lastSync)
    },
    {
      title: 'APP VERSION',
      dataIndex: 'appVersion',
      key: 'appVersion',
      sorter: (a, b) => a.appVersion.length - b.appVersion.length,
      sortDirections: ['descend']
    },
    {
      title: 'HEALTH',
      dataIndex: 'healthCheck',
      key: 'healthCheck',
      sorter: (a, b) => a.healthCheck.length - b.healthCheck.length,
      sortDirections: ['descend'],
      render: (_, { healthCheck }) => {
        const text = healthCheck ? 'Healthy' : 'Unhealthy'
        const textColor = healthCheck ? '#14C25A' : '#FC8229'
        const bgColor = healthCheck ? '#14C25A1A' : '#FC82291A'
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
          <Space size='small' onClick={() => handleDelete(record?._id)}>
            <Button>
              <AiOutlineDelete />{' '}
            </Button>
          </Space>
        )
    }
  ]
}
