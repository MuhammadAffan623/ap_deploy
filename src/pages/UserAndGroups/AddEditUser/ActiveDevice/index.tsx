import { Col, Row, Space, Typography, theme } from 'antd'
import dayjs from 'dayjs'
import { CSSProperties } from 'react'
import IconIpad from '~/assets/icons/ipad.png'
import { ImagesBox } from '~/components'
import './styles.scss'

interface IActiveDeviceProps {
  device: IDevice
  onLogoutClick: (device: IDevice) => void
}

const deviceDetailParaStyle: React.CSSProperties = {
  marginBottom: 2
}

const ActiveDevice = ({ device, onLogoutClick }: IActiveDeviceProps) => {
  const { useToken } = theme
  const {
    token: { colorTextTertiary }
  } = useToken()

  const valueStyles: CSSProperties = {
    ...deviceDetailParaStyle,
    color: colorTextTertiary
  }

  return (
    <>
      <Col span={12} className='activeDeviceIconCol'>
        <Space align='center' className='iconAndTypeWrapper'>
          <ImagesBox src={IconIpad} alt='Device' />
          <Space direction='vertical' className='center'>
            <Typography.Text>{device?.deviceType}</Typography.Text>
            <Typography.Link onClick={() => onLogoutClick(device)}>Logout</Typography.Link>
          </Space>
        </Space>
      </Col>

      <Col span={12} className='activeDeviceDetailsCol'>
        <Typography.Paragraph style={deviceDetailParaStyle}>Name</Typography.Paragraph>
        <Typography.Paragraph style={valueStyles}>{device?.name}</Typography.Paragraph>
        <Typography.Paragraph style={deviceDetailParaStyle}>Last Sync</Typography.Paragraph>
        <Typography.Paragraph style={valueStyles}>
          {dayjs(device?.lastSync).format('DD/MM/YYYY')}
        </Typography.Paragraph>
        <Row gutter={30}>
          <Col span={12}>
            <Typography.Paragraph style={deviceDetailParaStyle}>AppVersion</Typography.Paragraph>
            <Typography.Paragraph style={valueStyles}>{device?.appVersion}</Typography.Paragraph>
          </Col>
          <Col span={12}>
            <Typography.Paragraph style={deviceDetailParaStyle}>OS</Typography.Paragraph>
            <Typography.Paragraph style={valueStyles}>{device?.os}</Typography.Paragraph>
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default ActiveDevice
