import { useMemo, useState } from 'react'
import { columns } from '../columns'
import { ConfirmationModal, DropDown, DynamicTable, SearchField } from '~/components'
import { itemsActions } from '~/utils/options'
import { message } from 'antd'
import '../style.scss'
import { useDeleteFormMutation } from '~/store/services/form.service'

const Disabled = ({
  isLoading,
  data = [],
  pagination,
  handlePaginationChange,
  handleEdit,
  onSearch,
  refetch
}: {
  isLoading: boolean
  data: IForm[]
  pagination: IPagination
  handleEdit: (editingItem: IForm) => void
  handlePaginationChange: (pg: IPagination) => void
  onSearch: (text: string) => void
  refetch: () => void
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [open, setOpen] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<string[] | null>(null)

  const [deleteForm] = useDeleteFormMutation()

  const handleClickItem = (key: string) => {
    if (key === '1') {
      if (selectedRowKeys.length > 0) {
        setOpen(true)
        setSelectedId(selectedRowKeys)
      } else {
        message.info('Please select rows to be deleted')
      }
    }
  }

  const handleResolve = (editingItem: IForm) => {
    handleEdit(editingItem)
  }

  const handleDelete = (id: number | string) => {
    setOpen(true)
    setSelectedId([id as string])
  }

  const handleConfirmDelete = () => {
    if (selectedId?.length) {
      deleteForm({ formIds: [...selectedId] })
        .unwrap()
        .then(() => {
          setSelectedRowKeys([])
          setSelectedId(null)
          refetch()
          message.success('Form has been deleted successfully')
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
        message='Are you sure you want to delete this form?'
      />
    </div>
  )
}

export default Disabled
