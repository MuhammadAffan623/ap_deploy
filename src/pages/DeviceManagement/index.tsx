import { Col, Row, Tabs, message } from 'antd'
import All from './Tabs/All'
import './style.scss'

import Active from './Tabs/Available'
import Disabled from './Tabs/Disabled'
import { PageHeader } from '~/components'
import { useEffect, useState } from 'react'
import { defautlPagination } from '~/utils/constant'
import usePermission from '~/hooks/usePermission'
import { useGetAllDevicesMutation } from '~/store/services/deveice.service'

const Library = () => {
  const [allData, setAllData] = useState([])
  const [activeData, setActiveData] = useState([])
  const [disabledData, setDisabledData] = useState([])
  const [pagination, setPagination] = useState<IPagination>(defautlPagination)
  const [activePagination, setActivePagination] = useState<IPagination>(defautlPagination)
  const [disabledPagination, setDisabledPagination] = useState<IPagination>(defautlPagination)

  const [getAllDevices, { isLoading }] = useGetAllDevicesMutation()
  const { isLibraryManagement } = usePermission()

  useEffect(() => {
    fetchLibraries()
  }, [pagination.current, pagination.searchText])
  useEffect(() => {
    fetchActiveDevices()
  }, [activePagination.current, activePagination.searchText])
  useEffect(() => {
    fetchDisabledDevices()
  }, [disabledPagination.current, disabledPagination.searchText])

  const fetchLibraries = () => {
    getAllDevices(pagination)
      .unwrap()
      .then((res) => {
        setAllData(res.data.devices)
        setPagination({ ...pagination, total: res.data.meta.totalDevices })
      })
      .catch((err) => message.error(err?.data?.error))
  }
  const fetchActiveDevices = () => {
    getAllDevices({ ...activePagination, healthCheck: 'Healthy' })
      .unwrap()
      .then((res) => {
        setActiveData(res.data.devices)
        setActivePagination({ ...activePagination, total: res.data.meta.totalDevices })
      })
      .catch((err) => message.error(err?.data?.error))
  }
  const fetchDisabledDevices = () => {
    getAllDevices({ ...disabledPagination, healthCheck: 'Unhealthy' })
      .unwrap()
      .then((res) => {
        setDisabledData(res.data.devices)
        setDisabledPagination({ ...disabledPagination, total: res.data.meta.totalDevices })
      })
      .catch((err) => message.error(err?.data?.error))
  }

  const refetchAllData = () => {
    fetchLibraries()
    fetchActiveDevices()
    fetchDisabledDevices()
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
          refetch={refetchAllData}
          onSearch={(text: string) => onSearch(text, 'all')}
          isLoading={isLoading}
          isActionEnabled={isLibraryManagement}
        />
      )
    },
    {
      label: (
        <span>
          Healthy <span className='tab-count'>{activePagination.total}</span>
        </span>
      ),
      key: '2',
      children: (
        <Active
          data={activeData}
          pagination={activePagination}
          handlePaginationChange={(pg: IPagination) => handlePaginationChange(pg, 'active')}
          refetch={refetchAllData}
          onSearch={(text: string) => onSearch(text, 'active')}
          isLoading={isLoading}
          isActionEnabled={isLibraryManagement}
        />
      )
    },
    {
      label: (
        <span>
          UnHealthy <span className='tab-count'>{disabledPagination.total}</span>
        </span>
      ),
      key: '3',
      children: (
        <Disabled
          data={disabledData}
          pagination={disabledPagination}
          handlePaginationChange={(pg: IPagination) => handlePaginationChange(pg, 'disabled')}
          refetch={refetchAllData}
          onSearch={(text: string) => onSearch(text, 'disabled')}
          isLoading={isLoading}
          isActionEnabled={isLibraryManagement}
        />
      )
    }
  ]

  return (
    <Row gutter={[10, 10]} style={{ marginTop: 40 }}>
      <Col span={24} style={{ textAlign: 'right' }}>
        <PageHeader title='Device Management' />
      </Col>
      <Col span={24}>
        <Tabs defaultActiveKey='1' type='card' size='large' items={tabsItems} />
      </Col>
    </Row>
  )
}

export default Library
