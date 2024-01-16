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

const UserTable = () => {
  const [allData, setAllData] = useState([])
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
  const [pagination, setPagination] = useState<IPagination>({
    current: 1,
    pageSize: 7,
    total: 0,
    searchText: '',
    isActive: ''
  })

  const { groups } = useGroupsSelector()
  const [getAllUsers] = useGetAllUserMutation()

  useEffect(() => {
    fetchUsers()
  }, [pagination.current, pagination.searchText, pagination.isActive])

  const fetchUsers = () => {
    getAllUsers(pagination)
      .unwrap()
      .then((res) => {
        setAllData(res.data.users)
        setPagination({ ...pagination, total: res.data.meta.totalUsers })
      })
      .catch((err) => message.error(err?.data?.error))
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
          handlePaginationChange={handlePaginationChange}
          handleEdit={handleEdit}
          refetch={fetchUsers}
          onSearch={onSearch}
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
          refetch={fetchUsers}
          onSearch={onSearch}
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
          refetch={fetchUsers}
          onSearch={onSearch}
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
        <Tabs
          defaultActiveKey='1'
          type='card'
          size='large'
          items={tabsItems}
          onTabClick={onTabClick}
        />
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
