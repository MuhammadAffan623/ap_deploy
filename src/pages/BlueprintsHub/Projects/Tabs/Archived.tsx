import { useMemo, useState } from 'react'
import { columns } from '../columns'
import { ConfirmationModal, DropDown, DynamicTable, SearchField } from '~/components'
import { itemsActions } from '~/utils/options'
import { message } from 'antd'
import '../style.scss'
import { useDeleteProjectMutation } from '~/store/services/project.service'

const Archived = ({
  isLoading,
  data = [],
  pagination,
  handlePaginationChange,
  onSearch,
  handleEdit,
  refetch
}: {
  isLoading: boolean
  data: ILibrary[]
  pagination: IPagination
  handleEdit: (editingItem: ILibrary) => void
  handlePaginationChange: (pg: IPagination) => void
  onSearch: (text: string) => void
  refetch: () => void
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [open, setOpen] = useState<boolean>(false)
  const [projectId, setProjectId] = useState<string[] | null>(null)

  const [deleteProject] = useDeleteProjectMutation()

  const handleClickItem = (key: string) => {
    if (key === '1') {
      if (selectedRowKeys.length > 0) {
        setOpen(true)
        setProjectId(selectedRowKeys)
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
    setProjectId([id as string])
  }

  const handleConfirmDelete = () => {
    if (projectId?.length) {
      deleteProject({ libraryIds: [...projectId] })
        .unwrap()
        .then(() => {
          setSelectedRowKeys([])
          setProjectId(null)
          refetch()
          message.success('Project has been deleted successfully')
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
        message='Are you sure you want to delete this project?'
      />
    </div>
  )
}

export default Archived
