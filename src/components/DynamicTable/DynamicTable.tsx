import { HtmlHTMLAttributes } from 'react'
import { Table } from 'antd'
import './style.scss'

const DynamicTable = ({
  columns,
  dataSource,
  size,
  isLoading,
  onRowClick,
  pagination,
  handlePaginationChange,
  rowSelection
}: any): ReactNode => {
  const onRow = (record: any): HtmlHTMLAttributes<any> => {
    return {
      onClick: (e) => {
        e.stopPropagation()
        onRowClick ? onRowClick(record) : {}
      }
    }
  }
  return (
    <Table
      rowKey='_id'
      columns={columns}
      dataSource={dataSource}
      rowSelection={{ type: 'checkbox', ...rowSelection }}
      size={size}
      onRow={onRow}
      loading={isLoading}
      pagination={{ ...pagination }}
      onChange={handlePaginationChange}
      scroll={{ x: 780 }}
    />
  )
}

export default DynamicTable
