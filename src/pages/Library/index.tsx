import { Col, Row, Tabs, message } from 'antd'
import All from './Tabs/All'
import './style.scss'

import Active from './Tabs/Available'
import Disabled from './Tabs/Disabled'
import { PageHeader } from '~/components'
import { useEffect, useState } from 'react'
import AddEditLibrary from './AddEditLibrary'
import { useLibrarySelector } from '~/store/hooks'
import {
  useGetAllCategoriesMutation,
  useGetLibrariesMutation
} from '~/store/services/library.service'

const Library = () => {
  const [allData, setAllData] = useState([])
  const [open, setOpen] = useState<boolean>(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('last7days')
  const [isEdit, setEdit] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<ILibrary | null>(null)
  const [pagination, setPagination] = useState<IPagination>({
    current: 1,
    pageSize: 7,
    total: 0,
    searchText: '',
    isActive: ''
  })

  const { categories } = useLibrarySelector()
  const [getAllLibraries, { isLoading }] = useGetLibrariesMutation()
  const [getCategories] = useGetAllCategoriesMutation()

  useEffect(() => {
    fetchLibraries()
    getCategories('')
  }, [pagination.current, pagination.searchText, pagination.isActive])

  const fetchLibraries = () => {
    getAllLibraries(pagination)
      .unwrap()
      .then((res) => {
        setAllData(res.data.libraryItems)
        setPagination({ ...pagination, total: res.data.meta.totalLibraryItems })
      })
      .catch((err) => message.error(err?.data?.error))
  }

  const handleAdd = () => {
    setEditingItem(null)
    setOpen(true)
    setEdit(false)
  }
  const handleSelectChange = (value: string) => {
    setSelectedFilter(value)
  }

  const handleClose = (status: boolean, _data?: any) => {
    if (status) {
      setOpen(false)
    } else {
      setOpen(false)
    }
  }

  const handlePaginationChange = (pg: IPagination): void => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: pg.current,
      pageSize: pg.pageSize
    }))
  }

  const onSearch = (text: string) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: 1,
      searchText: text
    }))
  }

  const handleEdit = (editingLibrary: ILibrary) => {
    setOpen(true)
    setEdit(true)
    setEditingItem({ ...editingItem, ...editingLibrary })
  }

  const tabsItems = [
    {
      label: (
        <span>
          All <span className='tab-count'>{pagination.total}</span>
        </span>
      ),
      key: '1',
      children: (
        <All
          data={allData}
          pagination={pagination}
          handlePaginationChange={handlePaginationChange}
          handleEdit={handleEdit}
          refetch={fetchLibraries}
          onSearch={onSearch}
          isLoading={isLoading}
        />
      )
    },
    {
      label: (
        <span>
          Active <span className='tab-count'>{pagination.total}</span>
        </span>
      ),
      key: '2',
      children: (
        <Active
          data={allData}
          pagination={pagination}
          handlePaginationChange={handlePaginationChange}
          handleEdit={handleEdit}
          refetch={fetchLibraries}
          onSearch={onSearch}
          isLoading={isLoading}
        />
      )
    },
    {
      label: (
        <span>
          Disabled <span className='tab-count'>{pagination.total}</span>
        </span>
      ),
      key: '3',
      children: (
        <Disabled
          data={allData}
          pagination={pagination}
          handlePaginationChange={handlePaginationChange}
          handleEdit={handleEdit}
          refetch={fetchLibraries}
          onSearch={onSearch}
          isLoading={isLoading}
        />
      )
    }
  ]

  const onTabClick = (key: string) => {
    switch (key) {
      case '2':
        setPagination({ ...pagination, current: 1, isActive: true })
        break
      case '3':
        setPagination({ ...pagination, current: 1, isActive: false })
        break
      default:
        setPagination({ ...pagination, current: 1, isActive: '' })
    }
  }

  return (
    <Row gutter={[10, 10]} style={{ marginTop: 40 }}>
      <Col span={24} style={{ textAlign: 'right' }}>
        <PageHeader
          title='Libarary Dashboard'
          buttonText='Add Library'
          // showSelect
          // options={[
          //   { label: 'Last 7 days', value: 'last7days' },
          //   { label: 'Last month', value: 'lastmonth' }
          // ]}
          onButtonClick={handleAdd}
          selectValue={selectedFilter}
          onSelectChange={handleSelectChange}
        />
      </Col>
      <Col span={24}>
        <Tabs
          defaultActiveKey='1'
          type='card'
          size='large'
          items={tabsItems}
          onTabClick={onTabClick}
        />
      </Col>

      <AddEditLibrary
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        categories={categories ?? []}
        library={editingItem}
        refetch={fetchLibraries}
      />
    </Row>
  )
}

export default Library
