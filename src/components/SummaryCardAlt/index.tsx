import { Col, Row, Typography, theme } from 'antd'
import { FaMinus } from 'react-icons/fa'
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6'
import IconTag from '../IconTag'
import './styles.scss'

interface ISummaryProps {
  isSame?: boolean
  isRise: boolean
  value: number
  title: string
  reverse?: boolean
}

const SummaryCardAlt = ({
  isSame = false,
  isRise,
  title,
  value,
  reverse = false
}: ISummaryProps) => {
  const { useToken } = theme
  const {
    token: { colorTextTertiary }
  } = useToken()

  let isRiseCalculated = isRise

  if (reverse) {
    isRiseCalculated = !isRise
  }

  let icon = <FaArrowUpLong />
  let color = 'success'

  if (!isRiseCalculated) {
    icon = <FaArrowDownLong />
    color = 'gold'
  }

  if (isSame) {
    icon = <FaMinus />
    color = 'blue'
  }

  return (
    // <Card bodyStyle={{ borderRadius: borderRadiusLG }} className='customSummaryCardAlt'>
    <Row gutter={16} align='middle' className='customSummaryCardAlt'>
      <Col className='riseIndicatorBigCol'>
        <IconTag bordered={false} icon={icon} color={color} />
      </Col>
      <Col className='textCol'>
        <Typography.Title className='count' level={4}>
          {value}
        </Typography.Title>
        <Typography.Paragraph
          className='title'
          style={{ color: colorTextTertiary, marginBottom: 0 }}
        >
          {title}
        </Typography.Paragraph>
      </Col>
    </Row>
    // </Card>
  )
}

export default SummaryCardAlt
