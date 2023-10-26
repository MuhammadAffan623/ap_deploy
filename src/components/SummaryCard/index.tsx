import { Col, Row, Typography, theme } from 'antd'
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import Card from '../Card'
import './styles.scss'
import IconTag from '../IconTag'

interface ISummaryProps {
  isRise: boolean
  value: number
  title: string
  percentage: number
  reverse?: boolean
}

const SummaryCard = ({ isRise, percentage, title, value, reverse = false }: ISummaryProps) => {
  const { useToken } = theme
  const {
    token: { colorTextTertiary, colorError, colorSuccess, borderRadiusLG }
  } = useToken()

  let isRiseCalculated = isRise

  if (reverse) {
    isRiseCalculated = !isRise
  }

  return (
    <Card bodyStyle={{ borderRadius: borderRadiusLG }} className='customSummaryCard'>
      <Row gutter={16} align='middle'>
        <Col className='riseIndicatorBigCol'>
          <IconTag
            bordered={false}
            icon={isRiseCalculated ? <FaArrowUpLong /> : <FaArrowDownLong />}
            color={isRiseCalculated ? 'blue' : 'gold'}
          />
        </Col>
        <Col className='textCol'>
          <Typography.Paragraph
            className='title'
            style={{ color: colorTextTertiary, marginBottom: 0 }}
          >
            {title}
          </Typography.Paragraph>
          <Row align='middle' justify='space-between'>
            <Typography.Text strong className='value'>
              {value}
            </Typography.Text>
            <Typography.Text
              style={{ color: isRiseCalculated ? colorSuccess : colorError }}
              className={[isRiseCalculated ? 'riseIndicator' : 'fallIndicator', 'percentage'].join(
                ' '
              )}
            >
              {isRiseCalculated ? <FaArrowUp /> : <FaArrowDown />} {percentage.toFixed(2)}%
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default SummaryCard
