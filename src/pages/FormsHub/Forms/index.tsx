import { Col, Row, Tabs, message } from 'antd'
import All from './Tabs/All'
import './style.scss'

import Active from './Tabs/Available'
import Disabled from './Tabs/Disabled'
import { PageHeader } from '~/components'
import { useEffect, useState } from 'react'
import AddEditForm from './AddEditForm'
import { defautlPagination } from '~/utils/constant'
import { useGetFormsMutation } from '~/store/services/form.service'

const Forms = () => {
  const [allData, setAllData] = useState([])
  const [activeData, setActiveData] = useState([])
  const [disabledData, setDisabledData] = useState([])
  const [pagination, setPagination] = useState<IPagination>(defautlPagination)
  const [activePagination, setActivePagination] = useState<IPagination>(defautlPagination)
  const [disabledPagination, setDisabledPagination] = useState<IPagination>(defautlPagination)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('last7days')
  const [isEdit, setEdit] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<IForm | null>(null)

  const [getForms, { isLoading }] = useGetFormsMutation()

  useEffect(() => {
    fetchForms()
  }, [pagination.current, pagination.searchText])
  useEffect(() => {
    fetchCompletedForms()
  }, [activePagination.current, activePagination.searchText])
  useEffect(() => {
    fetchDraftForms()
  }, [disabledPagination.current, disabledPagination.searchText])

  const fetchForms = () => {
    getForms(pagination)
      .unwrap()
      .then((res) => {
        setAllData(res.data.templates)
        setPagination({ ...pagination, total: res.data.meta.totalCount })
      })
      .catch((err) => message.error(err?.data?.error || 'Error while loading forms'))
  }
  const fetchCompletedForms = () => {
    getForms({ ...activePagination, status: 'Completed' })
      .unwrap()
      .then((res) => {
        setActiveData(res.data.templates)
        setActivePagination({ ...activePagination, total: res.data.meta.totalCount })
      })
      .catch((err) => message.error(err?.data?.error || 'Error while loading forms'))
  }
  const fetchDraftForms = () => {
    getForms({ ...disabledPagination, status: 'Draft' })
      .unwrap()
      .then((res) => {
        setDisabledData(res.data.templates)
        setDisabledPagination({ ...disabledPagination, total: res.data.meta.totalCount })
      })
      .catch((err) => message.error(err?.data?.error || 'Error while loading forms'))
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

  const handleEdit = (editingLibrary: IForm) => {
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
          refetch={fetchForms}
          onSearch={(text: string) => onSearch(text, 'all')}
          isLoading={isLoading}
        />
      )
    },
    {
      label: (
        <span>
          Completed <span className='tab-count'>{activePagination.total}</span>
        </span>
      ),
      key: '2',
      children: (
        <Active
          data={activeData}
          pagination={activePagination}
          handlePaginationChange={(pg: IPagination) => handlePaginationChange(pg, 'active')}
          handleEdit={handleEdit}
          refetch={fetchCompletedForms}
          onSearch={(text: string) => onSearch(text, 'active')}
          isLoading={isLoading}
        />
      )
    },
    {
      label: (
        <span>
          Draft <span className='tab-count'>{disabledPagination.total}</span>
        </span>
      ),
      key: '3',
      children: (
        <Disabled
          data={disabledData}
          pagination={disabledPagination}
          handlePaginationChange={(pg: IPagination) => handlePaginationChange(pg, 'disabled')}
          handleEdit={handleEdit}
          refetch={fetchDraftForms}
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
          title='Form'
          buttonText='Add Form'
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

      <AddEditForm
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        editItem={editingItem}
        refetch={fetchForms}
      />
    </Row>
  )
}

export default Forms
