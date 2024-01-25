import { Button, Col, Row, Typography, theme } from 'antd'
import { CSSProperties, useEffect } from 'react'
import { Card, ImagesBox, UserGroupCard } from '~/components'
import NewGroupImage from '~/assets/images/new-group.png'
import { useGroupsSelector } from '~/store/hooks'
import { useNavigate } from 'react-router-dom'
import UserTable from './UserTable'
import './style.scss'
import { useGetGroupsMutation } from '~/store/services/groups.service'

const UserAndGroups = () => {
  const [fetchGroups] = useGetGroupsMutation()
  const { groups } = useGroupsSelector()

  const navigate = useNavigate()
  const { useToken } = theme

  const {
    token: { colorTextTertiary }
  } = useToken()

  const colorTextTertiaryStyles: CSSProperties = {
    color: colorTextTertiary
  }

  useEffect(() => {
    fetchGroups('')
  }, [])

  const handleEdit = (name: string) => {
    navigate(`/user-and-groups/${name}`)
  }

  return (
    <>
      <Row gutter={[30, 30]}>
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
                  className='add-group-button'
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

        {groups.map((group) => (
          <Col key={group?._id} span={24} md={12} xl={8}>
            <UserGroupCard
              name={group?.name}
              users={group?.users}
              handleEdit={() => handleEdit(group?.name)}
            />
          </Col>
        ))}
      </Row>

      <UserTable />
    </>
  )
}

export default UserAndGroups
