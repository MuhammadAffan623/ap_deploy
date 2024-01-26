import { useMemo, useState } from 'react'
import { columns } from '../columns'
import { ConfirmationModal, DropDown, DynamicTable, SearchField } from '~/components'
import { itemsActions } from '~/utils/options'
import { message } from 'antd'
import '../style.scss'
import { useDeleteLibraryMutation } from '~/store/services/library.service'

const Completed = ({
  isLoading,
  data = [],
  pagination,
  handlePaginationChange,
  handleEdit,
  onSearch,
  refetch,
  isActionEnabled
}: {
  isLoading: boolean
  data: ILibrary[]
  pagination: IPagination
  handleEdit: (editingItem: ILibrary) => void
  handlePaginationChange: (pg: IPagination) => void
  onSearch: (text: string) => void
  refetch: () => void
  isActionEnabled?: boolean
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [open, setOpen] = useState<boolean>(false)
  const [libraryId, setLibraryId] = useState<string[] | null>(null)

  const [deleteLibrary] = useDeleteLibraryMutation()

  const handleClickItem = (key: string) => {
    if (key === '1') {
      if (selectedRowKeys.length > 0) {
        setOpen(true)
        setLibraryId(selectedRowKeys)
      } else {
        message.info('Please select rows to be deleted')
      }
    }
  }

  const handleResolve = (editingItem: ILibrary) => {
    handleEdit(editingItem)
  }

  const handleDelete = (id: number | string) => {
    setOpen(true)
    setLibraryId([id as string])
  }

  const handleConfirmDelete = () => {
    if (libraryId?.length) {
      deleteLibrary({ libraryIds: [...libraryId] })
        .unwrap()
        .then(() => {
          setSelectedRowKeys([])
          setLibraryId(null)
          refetch()
          message.success('Library deleted successfully')
        })
        .catch((err) => message.error(err?.data?.error))
    }
  }

  const onSelectChange = (newSelectedRowKeys: any) => {
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
          <SearchField placeholder='Search...' handleChange={(value) => onSearch(value)} />
        </div>
        {isActionEnabled && <DropDown items={itemsActions} handleClickItem={handleClickItem} />}
      </div>
      {useMemo(() => {
        return (
          <DynamicTable
            dataSource={data}
            columns={columns(handleResolve, handleDelete, isActionEnabled)}
            isLoading={isLoading}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
            rowSelection={rowSelection}
          />
        )
      }, [data, selectedRowKeys, isLoading])}

      <ConfirmationModal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          setOpen(false)
          handleConfirmDelete()
        }}
        title='Confirm Delete'
        message='Are you sure you want to delete this library?'
      />
    </div>
  )
}

export default Completed
