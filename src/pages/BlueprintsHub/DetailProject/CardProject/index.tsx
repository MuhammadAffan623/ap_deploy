import { Card, Map } from '~/components'
import { Col, DatePicker, Row, Typography } from 'antd'
import './style.scss'
import CountCard from '~/components/CountCard'
import NewProject from '../../../../assets/images/Project.png'
import MapIcon from '../../../../assets/images/Map.png'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Weather from '~/components/Weather'

const CardProject = ({
  handleSheetClick,
  handleDateChange,
  projectDetails
}: {
  handleSheetClick: () => void
  handleDateChange: (d: string | null) => void
  projectDetails: any
}) => {
  const [showMap, setShowMap] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const dt = projectDetails?.project?.projectEndDate
  useEffect(() => {
    if (dt) {
      setSelectedDate(dt)
    }
  }, [dt])

  const lat = projectDetails?.project?.latitude
  const lng = projectDetails?.project?.longitude

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
              <DatePicker
                name='selectedDate'
                placeholder='Select End Date'
                style={{ marginTop: '3px' }}
                allowClear={false}
                value={dayjs(selectedDate)}
                onChange={(val) => {
                  handleDateChange(val ? dayjs(val).toISOString() : null)
                }}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12} xl={12} xxl={6}>
        <CountCard title='PROJECT LINKS' src={NewProject} count='1' onClick={handleSheetClick}>
          + Sheet
        </CountCard>
      </Col>
      <Col span={12} xl={12} xxl={6}>
        <CountCard
          title='PROJECT ADDRESS'
          src={MapIcon}
          count='2'
          onClick={() => setShowMap((prev) => !prev)}
        >
          {showMap ? 'Close' : 'Open'} Map
        </CountCard>
      </Col>
      <Col span={24} xxl={12}>
        <Weather />
      </Col>
      {showMap && (
        <Col xs={24}>
          <Map latitude={lat ? Number(lat) : lat} longitude={lng ? Number(lng) : lng} />
        </Col>
      )}
    </>
  )
}

export default CardProject
