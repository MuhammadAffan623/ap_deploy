import { Col, Row, Tabs, message } from 'antd'
import All from './Tabs/All'
import './style.scss'

import Active from './Tabs/Active'
import Comleted from './Tabs/Completed'
import { PageHeader } from '~/components'
import { useEffect, useState } from 'react'
import AddEditProject from './AddEditProject'
import { defautlPagination } from '~/utils/constant'
import Archived from './Tabs/Archived'
import { useGetProjectsMutation } from '~/store/services/project.service'
import usePermission from '~/hooks/usePermission'

const Projects = () => {
  const [allData, setAllData] = useState([])
  const [activeData, setActiveData] = useState([])
  const [completedData, setCompletedData] = useState([])
  const [archivedData, setArchivedData] = useState([])
  const [pagination, setPagination] = useState<IPagination>(defautlPagination)
  const [activePagination, setActivePagination] = useState<IPagination>(defautlPagination)
  const [completedPagination, setCompletedPagination] = useState<IPagination>(defautlPagination)
  const [archivedPagination, setArchivedPagination] = useState<IPagination>(defautlPagination)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('last7days')
  const [isEdit, setEdit] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<ILibrary | null>(null)

  const [getAllProjects, { isLoading }] = useGetProjectsMutation()
  const { isBluePrintManagement } = usePermission()

  useEffect(() => {
    fetchAllProjects()
  }, [pagination.current, pagination.searchText])
  useEffect(() => {
    fetchActiveProjects()
  }, [activePagination.current, activePagination.searchText])
  useEffect(() => {
    fetchCompletedProjects()
  }, [completedPagination.current, completedPagination.searchText])
  useEffect(() => {
    fetchArchivedProjects()
  }, [completedPagination.current, completedPagination.searchText])

  const fetchAllProjects = () => {
    getAllProjects(pagination)
      .unwrap()
      .then((res) => {
        setAllData(res.data.projects)
        setPagination({ ...pagination, total: res.data.meta.totalLibraryItems })
      })
      .catch((err) => {
        message.error(err?.data?.error)
      })
  }
  const fetchActiveProjects = () => {
    getAllProjects({ ...activePagination, status: 'active' })
      .unwrap()
      .then((res) => {
        setActiveData(res.data.projects)
        setActivePagination({ ...activePagination, total: res.data.meta.totalCount })
      })
      .catch((err) => message.error(err?.data?.error))
  }
  const fetchCompletedProjects = () => {
    getAllProjects({ ...completedPagination, status: 'completed' })
      .unwrap()
      .then((res) => {
        setCompletedData(res.data.projects)
        setCompletedPagination({ ...completedPagination, total: res.data.meta.totalCount })
      })
      .catch((err) => message.error(err?.data?.error))
  }
  const fetchArchivedProjects = () => {
    getAllProjects({ ...archivedPagination, status: 'archived' })
      .unwrap()
      .then((res) => {
        setArchivedData(res.data.projects)
        setArchivedPagination({ ...archivedPagination, total: res.data.meta.totalCount })
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
        ? setCompletedPagination
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
        ? setCompletedPagination
        : type === 'archived'
        ? setArchivedPagination
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
          refetch={fetchAllProjects}
          onSearch={(text: string) => onSearch(text, 'all')}
          isLoading={isLoading}
          isActionEnabled={isBluePrintManagement}
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
          refetch={fetchActiveProjects}
          onSearch={(text: string) => onSearch(text, 'active')}
          isLoading={isLoading}
          isActionEnabled={isBluePrintManagement}
        />
      )
    },
    {
      label: (
        <span>
          Completed <span className='tab-count'>{completedPagination.total}</span>
        </span>
      ),
      key: '3',
      children: (
        <Comleted
          data={completedData}
          pagination={completedPagination}
          handlePaginationChange={(pg: IPagination) => handlePaginationChange(pg, 'completed')}
          handleEdit={handleEdit}
          refetch={fetchCompletedProjects}
          onSearch={(text: string) => onSearch(text, 'completed')}
          isLoading={isLoading}
          isActionEnabled={isBluePrintManagement}
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
          refetch={fetchCompletedProjects}
          onSearch={(text: string) => onSearch(text, 'archived')}
          isLoading={isLoading}
          isActionEnabled={isBluePrintManagement}
        />
      )
    }
  ]

  return (
    <Row gutter={[10, 10]} style={{ marginTop: 40 }}>
      <Col span={24} style={{ textAlign: 'right' }}>
        <PageHeader
          title='Project Dashboard'
          buttonText={isBluePrintManagement ? 'Add Project' : ''}
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

      <AddEditProject
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        editItem={editingItem}
        refetch={fetchAllProjects}
      />
    </Row>
  )
}

export default Projects
