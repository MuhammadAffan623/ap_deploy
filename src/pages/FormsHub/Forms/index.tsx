import { Col, Row, Tabs, message } from 'antd'
import All from './Tabs/All'
import './style.scss'

import Completed from './Tabs/Completed'
import Draft from './Tabs/Draft'
import { PageHeader } from '~/components'
import { useEffect, useState } from 'react'
import AddEditForm from './AddEditForm'
import { defautlPagination } from '~/utils/constant'
import { useGetFormsMutation } from '~/store/services/form.service'
import usePermission from '~/hooks/usePermission'
import { useNavigate } from 'react-router-dom'

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
  const { isFormManagement } = usePermission()
  const navigate = useNavigate()
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

  const refetchAllData = () => {
    fetchForms()
    fetchCompletedForms()
    fetchDraftForms()
  }

  const handleAdd = () => {

    // navigate to pdf me page and take file input there
    // setEditingItem(null)
    // setOpen(true)
    // setEdit(false
    navigate("/editor")
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
    console.log({editingLibrary})
    console.log('>>> ', editingLibrary?.file?.versions?.slice(-1)[0])
    console.log('>>> ', editingLibrary?.file?.versions?.[0])
    const fileLastVersion  =  editingLibrary?.file?.versions?.slice(-1)[0]
    if(fileLastVersion.awsVersionId && fileLastVersion.key){
      console.log('>> :', `/editor/${fileLastVersion.key}/${fileLastVersion.awsVersionId}`)
      navigate(`/editor?fileKey=${fileLastVersion.key}&fileAwsVersionId=${fileLastVersion.awsVersionId}`)
      // navigate(`/editor?fileUrl=${editingLibrary?.file?.versions?.slice(-1)[0].key}&versionId=${editingLibrary?.file?.versions?.[0].awsVersionId}`)
    }
    // setOpen(true)
    // setEdit(true)
    // setEditingItem({ ...editingItem, ...editingLibrary })
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
          refetch={refetchAllData}
          onSearch={(text: string) => onSearch(text, 'all')}
          isLoading={isLoading}
          isActionManagement={isFormManagement}
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
        <Completed
          data={activeData}
          pagination={activePagination}
          handlePaginationChange={(pg: IPagination) => handlePaginationChange(pg, 'active')}
          handleEdit={handleEdit}
          refetch={refetchAllData}
          onSearch={(text: string) => onSearch(text, 'active')}
          isLoading={isLoading}
          isActionManagement={isFormManagement}
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
        <Draft
          data={disabledData}
          pagination={disabledPagination}
          handlePaginationChange={(pg: IPagination) => handlePaginationChange(pg, 'disabled')}
          handleEdit={handleEdit}
          refetch={refetchAllData}
          onSearch={(text: string) => onSearch(text, 'disabled')}
          isLoading={isLoading}
          isActionManagement={isFormManagement}
        />
      )
    }
  ]

  return (
    <Row gutter={[10, 10]} style={{ marginTop: 40 }}>
      <Col span={24} style={{ textAlign: 'right' }}>
        <PageHeader
          title='Form'
          buttonText={isFormManagement ? 'Add Form' : ''}
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
        refetch={refetchAllData}
      />
    </Row>
  )
}

export default Forms
