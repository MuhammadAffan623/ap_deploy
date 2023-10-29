import { Col, Row, Tag, Typography, theme } from 'antd'
import React, { CSSProperties } from 'react'
import { FaApple, FaEllipsis } from 'react-icons/fa6'
import { Button, Card } from '~/components'
import './styles.scss'

interface IDevicesStatusCard {
  count: number
  status: 'offline' | 'online'
}

const DevicesStatusCard = ({ count, status }: IDevicesStatusCard) => {
  const { useToken } = theme
  const {
    token: { colorTextTertiary }
  } = useToken()

  const colorTextTertiaryStyles: CSSProperties = {
    color: colorTextTertiary
  }

  return (
    <Card className={status === 'offline' ? 'offline-devices-card' : 'online-devices-card'}>
      <Row justify='space-between'>
        <Col>
          <Typography.Title level={4} style={colorTextTertiaryStyles}>
            <FaApple /> Devices {status === 'offline' ? 'Offline' : 'Online'}
          </Typography.Title>
        </Col>

        <Col>
          <Button icon={<FaEllipsis />} type='text' style={colorTextTertiaryStyles} />
        </Col>
      </Row>

      <Row className='content-row'>
        <Col span={24} className='center'>
          <Tag
            color='default'
            className={status === 'offline' ? 'offline-devices-tag' : 'online-devices-tag'}
            style={colorTextTertiaryStyles}
          >
            <Typography.Title level={2} className='count'>
              {count}
            </Typography.Title>
            /sessions
          </Tag>
        </Col>
      </Row>
    </Card>
  )
}

export default DevicesStatusCard
