import { Col, Row, Tabs, message } from 'antd'
import All from './Tabs/All'
import './style.scss'

import Active from './Tabs/Active'
import Disabled from './Tabs/Disabled'
import { Button } from '~/components'
import { FaPlus } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import AddEditUserInGroup from './AddEditUser'
import { useGroupsSelector } from '~/store/hooks'
import { useGetAllUserMutation } from '~/store/services/auth.services'
import { defautlPagination } from '~/utils/constant'

const UserTable = () => {
  const [allData, setAllData] = useState([])
  const [activeData, setActiveData] = useState([])
  const [disabledData, setDisabledData] = useState([])
  const [pagination, setPagination] = useState<IPagination>(defautlPagination)
  const [activePagination, setActivePagination] = useState<IPagination>(defautlPagination)
  const [disabledPagination, setDisabledPagination] = useState<IPagination>(defautlPagination)
  const [open, setOpen] = useState<boolean>(false)
  const [isEdit, setEdit] = useState<boolean>(false)
  const [editingUser, setEditingUser] = useState<IUser | null>({
    activeDevices: [
      {
        appVersion: '2.3.0',
        deviceType: 'iPad',
        lastSync: '2021-09-30T10:00:00.000Z',
        name: 'iPad',
        os: 'iOS'
      }
    ]
  } as IUser)

  const { groups } = useGroupsSelector()
  const [getAllUsers, { isLoading }] = useGetAllUserMutation()

  useEffect(() => {
    fetchUsers()
  }, [pagination.current, pagination.searchText])
  useEffect(() => {
    fetchActiveUsers()
  }, [activePagination.current, activePagination.searchText])
  useEffect(() => {
    fetchDisabledUsers()
  }, [disabledPagination.current, disabledPagination.searchText])

  const fetchUsers = () => {
    getAllUsers(pagination)
      .unwrap()
      .then((res) => {
        setAllData(res.data.users)
        setPagination({ ...pagination, total: res.data.meta.totalUsers })
      })
      .catch((err) => message.error(err?.data?.error))
  }
  const fetchActiveUsers = () => {
    getAllUsers({ ...activePagination, isActive: true })
      .unwrap()
      .then((res) => {
        setActiveData(res.data.users)
        setActivePagination({ ...activePagination, total: res.data.meta.totalUsers })
      })
      .catch((err) => message.error(err?.data?.error))
  }
  const fetchDisabledUsers = () => {
    getAllUsers({ ...disabledPagination, isActive: false })
      .unwrap()
      .then((res) => {
        setDisabledData(res.data.users)
        setDisabledPagination({ ...disabledPagination, total: res.data.meta.totalUsers })
      })
      .catch((err) => message.error(err?.data?.error))
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

  const handleClose = (status: boolean, _data?: any) => {
    if (status) {
      setOpen(false)
    } else {
      setOpen(false)
    }
  }

  const handleEdit = (editingItem: IUser) => {
    setOpen(true)
    setEdit(true)
    setEditingUser({ ...editingUser, ...editingItem })
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
          refetch={fetchUsers}
          onSearch={(text) => onSearch(text, 'all')}
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
          refetch={fetchActiveUsers}
          onSearch={(text) => onSearch(text, 'active')}
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
          refetch={fetchDisabledUsers}
          onSearch={(text) => onSearch(text, 'disabled')}
          isLoading={isLoading}
        />
      )
    }
  ]

  return (
    <Row gutter={[10, 10]} style={{ marginTop: 40 }}>
      <Col span={24} style={{ textAlign: 'right' }}>
        <Button
          type='primary'
          icon={<FaPlus />}
          onClick={() => {
            setOpen(true)
            setEdit(false)
            setEditingUser(null)
          }}
        >
          Add User
        </Button>
      </Col>
      <Col span={24}>
        <Tabs defaultActiveKey='1' type='card' size='large' items={tabsItems} />
      </Col>

      <AddEditUserInGroup
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        groups={groups ?? []}
        user={editingUser}
        refetch={fetchUsers}
      />
    </Row>
  )
}

export default UserTable
