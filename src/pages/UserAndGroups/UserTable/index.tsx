import { Col, Row, Tabs } from 'antd'
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

const tabsItems = [
  {
    label: (
      <span>
        All <span className='tab-count'>10</span>
      </span>
    ),
    key: '1',
    children: <All />
  },
  {
    label: (
      <span>
        Active <span className='tab-count'>10</span>
      </span>
    ),
    key: '2',
    children: <Active />
  },
  {
    label: (
      <span>
        Disabled <span className='tab-count'>10</span>
      </span>
    ),
    key: '3',
    children: <Disabled />
  }
]

const UserTable = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [isEdit] = useState<boolean>(false)
  const [editingUser] = useState<IUser>({
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
  const [getAllUsers] = useGetAllUserMutation()

  useEffect(() => {
    getAllUsers('')
  }, [])

  const handleClose = (status: boolean, _data?: any) => {
    if (status) {
      setOpen(false)
    } else {
      setOpen(false)
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
          }}
        >
          Add
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
      />
    </Row>
  )
}

export default UserTable
