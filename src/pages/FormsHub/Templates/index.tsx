import { Col, Row, Tabs, message } from 'antd'
import All from './Tabs/All'
import './style.scss'

import Active from './Tabs/Available'
import Disabled from './Tabs/Disabled'
import { PageHeader } from '~/components'
import { useEffect, useState } from 'react'
import AddEditForm from './AddEditForm'
import { defautlPagination } from '~/utils/constant'
import { useGetTemplatesMutation } from '~/store/services/template.service'
import Archived from './Tabs/Archived'
import usePermission from '~/hooks/usePermission'

const Templates = () => {
  const [allData, setAllData] = useState([])
  const [activeData, setActiveData] = useState([])
  const [disabledData, setDisabledData] = useState([])
  const [archivedData, setArchivedData] = useState([])
  const [pagination, setPagination] = useState<IPagination>(defautlPagination)
  const [activePagination, setActivePagination] = useState<IPagination>(defautlPagination)
  const [disabledPagination, setDisabledPagination] = useState<IPagination>(defautlPagination)
  const [archivedPagination, setArchivedPagination] = useState<IPagination>(defautlPagination)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('last7days')
  const [isEdit, setEdit] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<IForm | null>(null)



  const [getForms, { isLoading }] = useGetTemplatesMutation()
  const { isFormManagement } = usePermission()

  useEffect(() => {
    fetchAllTemplates()
  }, [pagination.current, pagination.searchText])
  useEffect(() => {
    fetchAvailabedTemplates()
  }, [activePagination.current, activePagination.searchText])
  useEffect(() => {
    fetchDisabledTemplates()
  }, [disabledPagination.current, disabledPagination.searchText])
  useEffect(() => {
    fetchArchivedTemplates()
  }, [archivedPagination.current, archivedPagination.searchText])

  const fetchAllTemplates = () => {
    getForms(pagination)
      .unwrap()
      .then((res) => {
        setAllData(res.data.templates)
        setPagination({ ...pagination, total: res.data.meta.totalCount })
      })
      .catch((err) => message.error(err?.data?.error || 'Error while loading templates'))
  }
  const fetchAvailabedTemplates = () => {
    getForms({ ...activePagination, status: 'Available' })
      .unwrap()
      .then((res) => {
        setActiveData(res.data.templates)
        setActivePagination({ ...activePagination, total: res.data.meta.totalCount })
      })
      .catch((err) => message.error(err?.data?.error || 'Error while loading templates'))
  }
  const fetchDisabledTemplates = () => {
    getForms({ ...disabledPagination, status: 'Disabled' })
      .unwrap()
      .then((res) => {
        setDisabledData(res.data.templates)
        setDisabledPagination({ ...disabledPagination, total: res.data.meta.totalCount })
      })
      .catch((err) => message.error(err?.data?.error || 'Error while loading templates'))
  }
  const fetchArchivedTemplates = () => {
    getForms({ ...archivedPagination, status: 'Archived' })
      .unwrap()
      .then((res) => {
        setArchivedData(res.data.templates)
        setArchivedPagination({ ...archivedPagination, total: res.data.meta.totalCount })
      })
      .catch((err) => message.error(err?.data?.error || 'Error while loading templates'))
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
        : type === 'archived'
        ? setArchivedPagination
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
        : type === 'archived'
        ? setArchivedPagination
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
          refetch={fetchAllTemplates}
          onSearch={(text: string) => onSearch(text, 'all')}
          isLoading={isLoading}
          isActionEnabled={isFormManagement}
        />
      )
    },
    {
      label: (
        <span>
          Available <span className='tab-count'>{activePagination.total}</span>
        </span>
      ),
      key: '2',
      children: (
        <Active
          data={activeData}
          pagination={activePagination}
          handlePaginationChange={(pg: IPagination) => handlePaginationChange(pg, 'active')}
          handleEdit={handleEdit}
          refetch={fetchAvailabedTemplates}
          onSearch={(text: string) => onSearch(text, 'active')}
          isLoading={isLoading}
          isActionEnabled={isFormManagement}
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
          refetch={fetchDisabledTemplates}
          onSearch={(text: string) => onSearch(text, 'disabled')}
          isLoading={isLoading}
          isActionEnabled={isFormManagement}
        />
      )
    },
    {
      label: (
        <span>
          Archived <span className='tab-count'>{archivedPagination.total}</span>
        </span>
      ),
      key: '4',
      children: (
        <Archived
          data={archivedData}
          pagination={archivedPagination}
          handlePaginationChange={(pg: IPagination) => handlePaginationChange(pg, 'archived')}
          handleEdit={handleEdit}
          refetch={fetchArchivedTemplates}
          onSearch={(text: string) => onSearch(text, 'archived')}
          isLoading={isLoading}
          isActionEnabled={isFormManagement}
        />
      )
    }
  ]

  return (
    <Row gutter={[10, 10]} style={{ marginTop: 40 }}>
      <Col span={24} style={{ textAlign: 'right' }}>
        <PageHeader
          title='Templates'
          buttonText={isFormManagement ? 'Add Template' : ''}
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
        refetch={fetchAllTemplates}
      />
    </Row>
  )
}

export default Templates
