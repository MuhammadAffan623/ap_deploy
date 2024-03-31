import { Col, Row, Typography } from 'antd'
import './style.scss'
import Card from '../Card'
import ImagesBox from '../Image'
import Button from '../Button'

interface CountCard {
  title?: string
  src?: any
  count?: string
  className?: string
  children?: ReactNode
  onClick?: () => void
}

const CountCard = ({ className, title, children, src, count, onClick }: CountCard) => {
  return (
    <Card className='Card-gap'>
      <Col className='count-card'>
        <Typography.Title level={4} className='Title-wrapper' type='secondary'>
          {title}
        </Typography.Title>
        <Row className='Image-title'>
          <ImagesBox src={src} />
          <Typography.Title level={3} className={className} type='secondary'>
            {count}
          </Typography.Title>
        </Row>
        <Button type='primary' onClick={onClick} className='Button'>
          {children}
        </Button>
      </Col>
    </Card>
  )
}

export default CountCard
