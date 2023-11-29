import { useEffect, useMemo, useState } from 'react'
import { columns } from '../columns'
import { DropDown, DynamicTable, SearchField } from '~/components'
import { getMockUsers } from '~/mocks'
import { itemsActions } from '~/utils/options'
import '../style.scss'

const Disabled = () => {
  const [data, setData] = useState<Partial<IForm>[] | []>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [pagination, setPagination] = useState<IPagination>({
    current: 1,
    pageSize: 7,
    total: 0
  })

  useEffect(() => {
    setLoadingData(true)
    const fetchData = getMockUsers(20, false, true)
    setData(fetchData)
    setLoadingData(false)
  }, [pagination])

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
            isLoading={loadingData}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
            rowSelection={rowSelection}
          />
        )
      }, [data, selectedRowKeys])}
    </div>
  )
}

export default Disabled