import { useMemo, useState } from 'react'
import { columns } from '../columns'
import { ConfirmationModal, DropDown, DynamicTable, SearchField } from '~/components'
import { itemsActions } from '~/utils/options'
import { useDeleteUserMutation } from '~/store/services/auth.services'
import { message } from 'antd'
import '../style.scss'

const Disabled = ({
  data = [],
  pagination,
  handlePaginationChange,
  onSearch,
  handleEdit,
  refetch
}: {
  data: IUser[]
  pagination: IPagination
  handleEdit: (editingItem: IUser) => void
  handlePaginationChange: (pg: IPagination) => void
  onSearch: (text: string) => void
  refetch: () => void
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [loadingData] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [userId, setUserId] = useState<string[] | null>(null)

  const [deleteUsers] = useDeleteUserMutation()

  const handleClickItem = (key: string) => {
    if (key === '1') {
      if (selectedRowKeys.length > 0) {
        setOpen(true)
        setUserId(selectedRowKeys)
      } else {
        message.info('Please select rows to be deleted')
      }
    }
  }

  const handleResolve = (editingItem: IUser) => {
    handleEdit(editingItem)
  }

  const handleDelete = (id: number | string) => {
    setOpen(true)
    setUserId([id as string])
  }

  const handleConfirmDelete = () => {
    if (userId?.length) {
      deleteUsers({ userIds: [...userId] })
        .unwrap()
        .then(() => {
          setSelectedRowKeys([])
          setUserId(null)
          refetch()
          message.success('User deleted successfully')
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

      <ConfirmationModal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          setOpen(false)
          handleConfirmDelete()
        }}
        title='Confirm Delete'
        message='Are you sure you want to delete this user?'
      />
    </div>
  )
}

export default Disabled
