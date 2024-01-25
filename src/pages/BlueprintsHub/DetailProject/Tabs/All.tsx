import { useMemo, useState } from 'react'
import { DropDown, DynamicTable, SearchField } from '~/components'
import { itemsActions } from '~/utils/options'
import { columns } from '../columns'

const All = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [search, setSearch] = useState<string>('')
  const [pagination, setPagination] = useState<IPagination>({
    current: 1,
    pageSize: 7,
    total: 0
  })

  const handlePaginationChange = (pg: IPagination): void => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: pg.current,
      pageSize: pg.pageSize
    }))
  }

  const handleClickItem = (key: string) => {
    console.log('handleClickItem key: ', key)
  }

  const handleResolve = (id: number | string) => {
    console.log('resolved', id)
  }

  const handleDelete = (id: number | string) => {
    console.log('deleted', id)
  }

  const onSelectChange = (newSelectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  return (
    <div className='table-container'>
      <div className='actions-wrapper'>
        <div className='search-box'>
          <SearchField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search...'
          />
        </div>
        <DropDown items={itemsActions} handleClickItem={handleClickItem} />
      </div>
      {useMemo(() => {
        return (
          <DynamicTable
            dataSource={data}
            columns={columns(handleResolve, handleDelete)}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
            rowSelection={rowSelection}
            isLoading={isLoading}
          />
        )
      }, [data, selectedRowKeys, isLoading])}
    </div>
  )
}

export default All
