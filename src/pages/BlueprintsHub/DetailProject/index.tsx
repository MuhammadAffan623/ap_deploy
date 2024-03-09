import { ImagesBox, PageHeader } from '~/components'
import { Card, Col, Row, Tabs, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import CardProject from './CardProject'
import All from './Tabs/All'
import Border from '~/assets/icons/border-left.png'
import List from '~/assets/icons/List .png'
import Tick from '~/assets/icons/arrow-tick.png'
import Camera from '~/assets/icons/camera.png'
import './style.scss'
import { useParams } from 'react-router-dom'
import { useGetProjectByIdMutation } from '~/store/services/project.service'
import { useUserSelector } from '~/store/hooks'

const DetailProject = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('last7days')
  const [data, setData] = useState<any>(null)
  const { id } = useParams()
  const { user } = useUserSelector()
  const [getProjectById, { isLoading }] = useGetProjectByIdMutation()

  useEffect(() => {
    if (id) {
      getProjectById({ id })
        .unwrap()
        .then((res) => {
          setData(res.data)
        })
        .catch((err: any) => {
          message.error(err?.data?.error || 'Failed to load project data')
        })
    }
  }, [id])

  const handleSelectChange = (value: string) => {
    setSelectedFilter(value)
  }

  const activityData = data?.recentActivities?.map((item: any) => ({
    icon:
      (item.imageType === 'list' && List) ||
      (item.imageType === 'camera' && Camera) ||
      (item.imageType === 'check' && Tick) ||
      '',
    title: item.description
  }))

  const tabsItems = [
    {
      label: (
        <span>
          All <span className='tab-count'>6</span>
        </span>
      ),
      key: '1',
      children: <All data={data?.project.sheets || []} isLoading={isLoading} />
    }
  ]

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <PageHeader
          title={`Good Morning ${user?.name}`}
          buttonText=' Upload Sheet'
          selectValue={selectedFilter}
          onSelectChange={handleSelectChange}
        />
      </Col>
      <Col span={24} lg={16}>
        <Row gutter={[20, 20]}>
          <CardProject />
        </Row>
      </Col>

      <Col span={24} lg={8}>
        <Card style={{ height: '100%' }}>
          <Typography.Title level={3} className='Title' type='secondary'>
            Recent Activity
          </Typography.Title>
          <Col className='Display-wrapper'>
            <Col>
              <ImagesBox src={Border} alt='' />
            </Col>
            <Col className='whole-wrapper'>
              {activityData?.map((item: { icon: string; title: string }, index: number) => (
                <React.Fragment key={index}>
                  <Col className='Map-data'>
                    {item.icon && <ImagesBox src={item.icon} />}
                    <Typography.Title level={5} className='Typography' type='secondary'>
                      {item.title}
                    </Typography.Title>
                  </Col>
                </React.Fragment>
              ))}
            </Col>
          </Col>
        </Card>
      </Col>

      <Col xs={24} className='Table-wrapper'>
        <Tabs defaultActiveKey='1' type='card' size='large' items={tabsItems} />
      </Col>
    </Row>
  )
}

export default DetailProject
