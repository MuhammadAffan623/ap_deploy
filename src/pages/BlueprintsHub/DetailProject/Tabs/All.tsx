import { useMemo, useState } from 'react'
import { DropDown, DynamicTable, SearchField } from '~/components'
import { itemsActions } from '~/utils/options'
import { columns } from '../columns'
import { useNavigate } from 'react-router-dom'
import { useGetFileMutation } from '~/store/services/file.services'
import { message } from 'antd'

const All = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [search, setSearch] = useState<string>('')
  const [isNavigating, setNavigating] = useState<boolean>(false)
  const [pagination, setPagination] = useState<IPagination>({
    current: 1,
    pageSize: 7,
    total: 0
  })
  const navigate = useNavigate()
  const [getFile] = useGetFileMutation()

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

  // const handleResolve = (id: number | string) => {
  //   console.log('resolved', id)
  // }

  // const handleDelete = (id: number | string) => {
  //   console.log('deleted', id)
  // }

  const onRowClick = (record: any) => {
    const selectedSheet = record.versions[record.versions?.length - 1]
    const params = {
      key: selectedSheet.key,
      versionId: selectedSheet.awsVersionId
    }

    setNavigating(true)
    getFile(params)
      .unwrap()
      .then((res) => {
        setNavigating(false)
        navigate(`/editor?fileUrl=${res.data}`)
      })
      .catch((error: any) => {
        setNavigating(false)
        message.error(error?.data?.error)
      })
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
            columns={columns()}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
            rowSelection={rowSelection}
            isLoading={isLoading || isNavigating}
            onRowClick={onRowClick}
          />
        )
      }, [data, selectedRowKeys, isLoading, isNavigating])}
    </div>
  )
}

export default All
