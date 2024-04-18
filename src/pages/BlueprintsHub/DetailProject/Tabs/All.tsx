import { useMemo, useState } from 'react'
import { ConfirmationModal, DropDown, DynamicTable, SearchField } from '~/components'
import { itemsActions } from '~/utils/options'
import { columns } from '../columns'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetFileMutation } from '~/store/services/file.services'
import { message } from 'antd'
import { useDeleteProjectSheetMutation } from '~/store/services/project.service'
import usePermission from '~/hooks/usePermission'

const All = ({
  data,
  isLoading,
  onSuccess
}: {
  data: any
  isLoading: boolean
  onSuccess: () => void
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [open, setOpen] = useState<boolean>(false)
  const [sheetsId, setSheetsId] = useState<string[] | null>(null)
  const [search, setSearch] = useState<string>('')
  const [isNavigating, setNavigating] = useState<boolean>(false)
  const {isBluePrintManagement} = usePermission()

  const [pagination, setPagination] = useState<IPagination>({
    current: 1,
    pageSize: 7,
    total: 0
  })
  const { id: projectId } = useParams()
  const navigate = useNavigate()
  const [getFile] = useGetFileMutation()
  const [deleteSheet] = useDeleteProjectSheetMutation()

  const handlePaginationChange = (pg: IPagination): void => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: pg.current,
      pageSize: pg.pageSize
    }))
  }

  const handleClickItem = (key: string) => {
    if (key === '1') {
      if (selectedRowKeys.length > 0) {
        setOpen(true)
        setSheetsId(selectedRowKeys)
      } else {
        message.info('Please select rows to be deleted')
      }
    }
  }

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
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const handleDelete = (e: MouseEvent, id: string) => {
    e.stopPropagation()
    setOpen(true)
    setSheetsId([id])
  }

  const handleConfirmDelete = () => {
    deleteSheet({ id: projectId, sheets: sheetsId })
      .unwrap()
      .then((res) => {
        message.success(res.message)
        onSuccess()
      })
      .catch((err) => {
        message.error(err?.data?.error)
      })
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
        {isBluePrintManagement &&(
          
          <DropDown items={itemsActions} handleClickItem={handleClickItem} />
          )}
      </div>
      {useMemo(() => {
        return (
          <DynamicTable
            dataSource={data}
            columns={columns(isBluePrintManagement, handleDelete)}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
            rowSelection={rowSelection}
            isLoading={isLoading || isNavigating}
            onRowClick={onRowClick}
          />
        )
      }, [data, selectedRowKeys, isLoading, isNavigating])}

      <ConfirmationModal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          setOpen(false)
          handleConfirmDelete()
        }}
        title='Confirm Delete'
        message='Are you sure you want to delete this Sheet?'
      />
    </div>
  )
}

export default All
