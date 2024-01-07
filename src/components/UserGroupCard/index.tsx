import { Avatar as AntAvatar, Col, Row, Typography, theme } from 'antd'
import { FaCopy } from 'react-icons/fa6'
import Avatar from '../Avatar'
import Card from '../Card'
import { CSSProperties } from 'react'

const UserGroupCard = ({ name, users = [], handleEdit }: IUserGroup) => {
  const { useToken } = theme

  const {
    token: { colorTextTertiary, colorTextSecondary, purple }
  } = useToken()

  const colorTextTertiaryStyles: CSSProperties = {
    color: colorTextTertiary
  }
  const colorTextSecondaryStyles: CSSProperties = {
    color: colorTextSecondary
  }

  return (
    <Card style={{ height: '100%' }}>
      <Row gutter={[10, 4]}>
        <Col span={24}>
          <Row justify='space-between' align='middle'>
            <Col>
              <Typography.Text style={colorTextTertiaryStyles}>
                Total {users.length} Users
              </Typography.Text>
            </Col>
            <Col>
              <AntAvatar.Group maxCount={3}>
                {users.map((user) => (
                  <Avatar
                    alt={user?.name as string}
                    key={user._id}
                    src={user.avatarUrl as string}
                    name={user?.name}
                  />
                ))}
              </AntAvatar.Group>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Typography.Title level={4} className='mb-0' style={colorTextSecondaryStyles}>
            {name}
          </Typography.Title>
        </Col>

        <Col span={24}>
          <Row justify='space-between'>
            <Typography.Link style={{ color: purple }} onClick={handleEdit}>
              Edit Group
            </Typography.Link>

            <Typography.Text>
              <FaCopy />
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default UserGroupCard
