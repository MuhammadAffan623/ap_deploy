import type { ColumnsType } from 'antd/es/table'
import { AiOutlineDelete } from 'react-icons/ai'
import { Button } from '~/components'

export const columns = (isShow: boolean, handleDelete: any): ColumnsType<any> => {
  return [
    {
      title: 'Sheet Name',
      dataIndex: 'fileName',
      key: 'fileName',
      width: 'max-content',
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ['descend']
    },
    {
      title: 'Version',
      dataIndex: 'versions.labelNumber',
      key: 'versions.labelNumber',
      sorter: (a, b) => a.category.length - b.category.length,
      sortDirections: ['descend'],
      render: (_, { versions }) => {
        return <div>{versions.length > 0 ? versions[versions.length - 1]?.labelNumber : null}</div>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'versions.labelNumber',
      key: 'versions.labelNumber',
      sorter: (a, b) => a.category.length - b.category.length,
      sortDirections: ['descend'],
      render: (_, { _id }) => {
        return (
          isShow && (
            <Button onClick={(e) => handleDelete(e, _id)}>
              <AiOutlineDelete />
            </Button>
          )
        )
      }
    }
  ]
}
