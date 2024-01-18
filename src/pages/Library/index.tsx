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
import { defautlPagination } from '~/utils/constant'

const Library = () => {
  const [allData, setAllData] = useState([])
  const [activeData, setActiveData] = useState([])
  const [disabledData, setDisabledData] = useState([])
  const [pagination, setPagination] = useState<IPagination>(defautlPagination)
  const [activePagination, setActivePagination] = useState<IPagination>(defautlPagination)
  const [disabledPagination, setDisabledPagination] = useState<IPagination>(defautlPagination)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('last7days')
  const [isEdit, setEdit] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<ILibrary | null>(null)

  const { categories } = useLibrarySelector()
  const [getAllLibraries, { isLoading }] = useGetLibrariesMutation()
  const [getCategories] = useGetAllCategoriesMutation()

  useEffect(() => {
    fetchLibraries()
    getCategories('')
  }, [pagination.current, pagination.searchText])
  useEffect(() => {
    fetchActiveLibraries()
  }, [activePagination.current, activePagination.searchText])
  useEffect(() => {
    fetchDisabledLibraries()
  }, [disabledPagination.current, disabledPagination.searchText])

  const fetchLibraries = () => {
    getAllLibraries(pagination)
      .unwrap()
      .then((res) => {
        setAllData(res.data.libraryItems)
        setPagination({ ...pagination, total: res.data.meta.totalLibraryItems })
      })
      .catch((err) => message.error(err?.data?.error))
  }
  const fetchActiveLibraries = () => {
    getAllLibraries({ ...activePagination, isActive: true })
      .unwrap()
      .then((res) => {
        setActiveData(res.data.libraryItems)
        setActivePagination({ ...activePagination, total: res.data.meta.totalLibraryItems })
      })
      .catch((err) => message.error(err?.data?.error))
  }
  const fetchDisabledLibraries = () => {
    getAllLibraries({ ...disabledPagination, isActive: false })
      .unwrap()
      .then((res) => {
        setDisabledData(res.data.libraryItems)
        setDisabledPagination({ ...disabledPagination, total: res.data.meta.totalLibraryItems })
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

  const handlePaginationChange = (pg: IPagination, type: string): void => {
    const setPaginationFunction =
      type === 'active'
        ? setActivePagination
        : type === 'disabled'
        ? setDisabledPagination
        : setPagination
    setPaginationFunction((prevPagination) => ({
      ...prevPagination,
      current: pg.current,
      pageSize: pg.pageSize
    }))
  }

  const onSearch = (text: string, type: string) => {
    const setPaginationFunction =
      type === 'active'
        ? setActivePagination
        : type === 'disabled'
        ? setDisabledPagination
        : setPagination
    setPaginationFunction((prevPagination) => ({
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
          handlePaginationChange={(pg: IPagination) => handlePaginationChange(pg, 'all')}
          handleEdit={handleEdit}
          refetch={fetchLibraries}
          onSearch={(text: string) => onSearch(text, 'all')}
          isLoading={isLoading}
        />
      )
    },
    {
      label: (
        <span>
          Active <span className='tab-count'>{activePagination.total}</span>
        </span>
      ),
      key: '2',
      children: (
        <Active
          data={activeData}
          pagination={activePagination}
          handlePaginationChange={(pg: IPagination) => handlePaginationChange(pg, 'active')}
          handleEdit={handleEdit}
          refetch={fetchActiveLibraries}
          onSearch={(text: string) => onSearch(text, 'active')}
          isLoading={isLoading}
        />
      )
    },
    {
      label: (
        <span>
          Disabled <span className='tab-count'>{disabledPagination.total}</span>
        </span>
      ),
      key: '3',
      children: (
        <Disabled
          data={disabledData}
          pagination={disabledPagination}
          handlePaginationChange={(pg: IPagination) => handlePaginationChange(pg, 'disabled')}
          handleEdit={handleEdit}
          refetch={fetchDisabledLibraries}
          onSearch={(text: string) => onSearch(text, 'disabled')}
          isLoading={isLoading}
        />
      )
    }
  ]

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
        <Tabs defaultActiveKey='1' type='card' size='large' items={tabsItems} />
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
