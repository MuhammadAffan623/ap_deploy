import { Button, Card } from '~/components'
import { Col, Row, Typography } from 'antd'
import './style.scss'
import { CloudUploadOutlined } from '@ant-design/icons'
import CountCard from '~/components/CountCard'
import NewProject from '../../../../assets/images/Project.png'
import Map from '../../../../assets/images/Map.png'

const CardProject = () => {
  return (
    <>
      <Col span={24} lg={12} xl={24} xxl={24}>
        <Card style={{ height: '100%' }}>
          <Row gutter={[20, 20]} align='middle' justify='space-between'>
            <Col>
              <Typography.Title level={3} type='secondary' className='Title1'>
                TIMELINE
              </Typography.Title>
              <Typography.Title level={4} className='Title'>
                Setup Your Project Timeline
              </Typography.Title>
              <Typography.Paragraph className='Paragrapgh' type='secondary'>
                Add Dates To See Project
              </Typography.Paragraph>
            </Col>
            <Col>
              <Button type='primary' className='save-button'>
                Add Dates
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12} xl={12} xxl={6}>
        <CountCard title='PROJECT LINKS' src={NewProject} count='1' children=' + Sheet' />
      </Col>
      <Col span={12} xl={12} xxl={6}>
        <CountCard title='PROJECT ADDRESS' src={Map} count='2' children='Open Map' />
      </Col>
      <Col span={24} xxl={12}>
        <Card>
          <Col className='Column-wrapper'>
            <Typography.Title level={4} className='Heading' type='secondary'>
              Weather
            </Typography.Title>
            <Typography.Title level={4} className='Heading' type='secondary'>
              Saint Cloud Flourida
            </Typography.Title>
          </Col>
          <Col className='Wrapper'>
            <Col>
              <CloudUploadOutlined className='icon-color' rev={undefined} />
            </Col>
            <Col>
              <Typography.Title level={5} className='Title'>
                Clear
              </Typography.Title>
              <Typography.Title level={5} className='Title'>
                High: 91 F Low: 73 F
              </Typography.Title>
            </Col>
            <Col>
              {' '}
              <Typography.Title level={5} className='Title'>
                Wind: 9 MPH, NE
              </Typography.Title>
              <Typography.Title level={5} className='Title'>
                Humidity: 66%
              </Typography.Title>
              <Typography.Title level={5} className='Title'>
                Percipitation: 0.0
              </Typography.Title>
            </Col>
          </Col>
          <Col>
            <Typography.Title level={5} className='Title'>
              Powered by Weather
            </Typography.Title>
            <Typography.Title level={5} className='Title'>
              show more
            </Typography.Title>
          </Col>
        </Card>
      </Col>
    </>
  )
}

export default CardProject
