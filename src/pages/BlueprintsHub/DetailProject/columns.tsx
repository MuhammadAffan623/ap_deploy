import type { ColumnsType } from 'antd/es/table'

export const columns = (): ColumnsType<any> => {
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
      title: 'Tag',
      dataIndex: 'Tag',
      key: 'Tag',
      sorter: (a, b) => a.category.length - b.category.length,
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
    }
  ]
}
