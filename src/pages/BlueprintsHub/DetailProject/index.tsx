import { ImagesBox, PageHeader } from '~/components'
import { Card, Col, Row, Tabs, Typography } from 'antd'
import { useState } from 'react'
import CardProject from './CardProject'
import All from './Tabs/All'
import Border from '~/assets/icons/border-left.png'
import List from '~/assets/icons/List .png'
import Tick from '~/assets/icons/arrow-tick.png'
import Camera from '~/assets/icons/camera.png'
import './style.scss'

const tabsItems = [
  {
    label: (
      <span>
        All <span className='tab-count'>6</span>
      </span>
    ),
    key: '1',
    children: <All />
  }
]

const DetailProject = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('last7days')

  const Data = [
    {
      icon: '',
      title: 'JAN 17, 2023'
    },
    {
      icon: List,
      title: 'Jarby A. added 2 markups.'
    },
    {
      icon: Camera,
      title: 'Jarby A. added a photo.'
    },
    {
      icon: Tick,
      title: 'Jarby A.  created Project 21034- Sunbridge'
    },
    {
      icon: '',
      title: 'End of activity'
    }
  ]

  const handleSelectChange = (value: string) => {
    setSelectedFilter(value)
  }

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <PageHeader
          title='Good Morning Jarby'
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
        <Card style={{height:'100%'}}>
          <Typography.Title level={3} className='Title' type='secondary'>
            Recent Activity
          </Typography.Title>
          <Col className='Display-wrapper'>
            <Col>
              <ImagesBox src={Border} alt='' />
            </Col>
            <Col className='whole-wrapper'>
              {Data?.map((item) => (
                <>
                  <Col className='Map-data'>
                    {item.icon && <ImagesBox src={item.icon} />}
                    <Typography.Title level={5} className='Typography' type='secondary'>
                      {item.title}
                    </Typography.Title>
                  </Col>
                </>
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
