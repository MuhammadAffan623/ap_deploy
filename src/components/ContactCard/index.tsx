import { Col, Divider, Row, Typography, theme } from 'antd'
import React, { CSSProperties } from 'react'
import Card from '../Card'
import Avatar from '../Avatar'
import Detail from './Detail'

interface IContactCardProps {
  user: Partial<IUser>
  onClick?: () => void
}

const ContactCard = ({ user, onClick }: IContactCardProps) => {
  const { useToken } = theme
  const {
    token: { colorTextTertiary }
  } = useToken()

  const colorTextTertiaryStyles: CSSProperties = {
    color: colorTextTertiary
  }

  return (
    <Col key={user?._id as string} span={24} md={12} xl={8} xxl={6}>
      <Card className='contact-card'>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Row gutter={16} align='middle'>
              <Col>
                <Avatar
                  size='large'
                  src={user?.avatar as string}
                  name={user?.name as string}
                  shape='square'
                />
              </Col>
              <Col>
                <Typography.Title
                  onClick={onClick}
                  level={5}
                  className='mb-0 contact-card-name'
                  style={{ cursor: 'pointer' }}
                >
                  {user?.name}
                </Typography.Title>
                <Typography.Text style={colorTextTertiaryStyles}>{user?.role}</Typography.Text>
              </Col>
            </Row>
          </Col>

          <Divider style={{ margin: 0 }} />
          <Col span={24}>
            <Detail label='Location' value={user?.address as string} />
          </Col>
          <Col span={24}>
            <Detail label='Email' value={user?.email as string} />
          </Col>
          <Col span={24}>
            <Detail label='Phone' value={user?.phone as string} />
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default ContactCard
