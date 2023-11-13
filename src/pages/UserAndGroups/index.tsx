import { Button, Col, Row, Typography, theme } from 'antd'
import { CSSProperties, useEffect, useState } from 'react'
import { Card, ImagesBox, UserGroupCard } from '~/components'
import { getMockUsers } from '~/mocks'
import NewGroupImage from '~/assets/images/new-group.png'
import AddEditUserInGroup from './AddEditUser'
import { useGroupsSelector, useAppDispatch } from '~/store/hooks'
import { getGroupsAsync } from '~/store/features/groups'
import { FaPlus } from 'react-icons/fa6'
import { Loader } from '~/components'
import { useNavigate } from 'react-router-dom'
import UserTable from './UserTable'

const UserAndGroups = () => {
  const { groups, loading } = useGroupsSelector()
  const [addEditUserInGroupModalOpen, setAddEditUserInGroupModalOpen] = useState<boolean>(false)
  const [isEdit] = useState<boolean>(true)
  const navigate = useNavigate()
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
  const { useToken } = theme

  const dispatch = useAppDispatch()

  const {
    token: { colorTextTertiary }
  } = useToken()

  const colorTextTertiaryStyles: CSSProperties = {
    color: colorTextTertiary
  }

  const handleCloseAddEditUserInGroupModal = (status: boolean, _data?: any) => {
    if (status) {
      setAddEditUserInGroupModalOpen(false)
    } else {
      setAddEditUserInGroupModalOpen(false)
    }
  }

  useEffect(() => {
    dispatch(getGroupsAsync(11))
  }, [dispatch])

  return (
    <>
      <Row gutter={[30, 30]}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {groups.map((group) => (
              <Col key={group?._id} span={24} md={12} xl={8}>
                <UserGroupCard
                  _id={group._id}
                  name={group?.name}
                  users={getMockUsers(11, true, false)}
                />
              </Col>
            ))}

            <Col span={24} md={12} xl={8}>
              <Card>
                <Row justify='space-between'>
                  <Col span={6}>
                    <ImagesBox src={NewGroupImage} alt='New Group' />
                  </Col>
                  <Col span={12}>
                    <Button
                      block
                      type='primary'
                      onClick={() => {
                        navigate('/add-group')
                      }}
                    >
                      Add New Group
                    </Button>
                    <Typography.Paragraph style={colorTextTertiaryStyles}>
                      Add group, if it does not exist
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </Card>
            </Col>
          </>
        )}

        <Col span={24} style={{ textAlign: 'right' }}>
          <Button
            type='primary'
            icon={<FaPlus />}
            onClick={() => {
              setAddEditUserInGroupModalOpen(true)
            }}
          >
            Add
          </Button>
        </Col>
      </Row>

      <AddEditUserInGroup
        open={addEditUserInGroupModalOpen}
        handleClose={handleCloseAddEditUserInGroupModal}
        isEdit={isEdit}
        groups={groups ?? []}
        user={editingUser}
      />

      <UserTable />
    </>
  )
}

export default UserAndGroups
