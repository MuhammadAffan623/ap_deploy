import { Col, DatePicker, Menu, Row, Tag, Typography, theme } from 'antd'
import dayjs from 'dayjs'
import { EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import React, { useEffect } from 'react'
import { FaApple, FaEllipsis } from 'react-icons/fa6'
import { Avatar, Button, Card, PageHeader, SummaryCard, SummaryCardAlt } from '~/components'
import { getMockUsers } from '~/mocks'
import { MenuItem, getMenuItem } from '~/utils/helper'
import './styles.scss'

const dateFormat = 'DD MMM'

const Dashboard = () => {
  const { useToken } = theme
  const {
    token: { colorTextTertiary, colorPrimary }
  } = useToken()

  const [userMenuItem, setUsersMenuItems] = React.useState<MenuItem[]>([])

  useEffect(() => {
    const menuItemTemp = getMockUsers(5, true, false).map((user) => {
      return getMenuItem(
        <Row justify='space-between'>
          <Col className='detailsCol'>
            <Typography.Paragraph style={{ marginBottom: 0 }} strong>
              {user?.name}
            </Typography.Paragraph>
            <Typography.Text style={{ color: colorTextTertiary }}>PK</Typography.Text>
          </Col>
          <Col>
            <Tag
              color='blue'
              bordered={false}
              className='userMenuButton'
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log(user?._id)
              }}
            >
              GO
            </Tag>
          </Col>
        </Row>,
        user?._id as string,
        <Avatar size='default' src={user?.avatarUrl as string} name={user?.name as string} />,
        null,
        'activeUser'
      )
    })

    setUsersMenuItems(menuItemTemp)
  }, [])

  const options: EChartsOption = {
    grid: { top: 8, right: 0, bottom: 24, left: 50 },

    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [2000, 1300, 2600, 2800, 900, 3000, 2500],
        type: 'line',
        // smooth: true,
        areaStyle: {
          shadowColor: '#304FFD',
          opacity: 0.1
        }
      }
    ],
    tooltip: {
      position: 'top',
      trigger: 'axis',
      className: 'customTooltip',
      formatter: `<center> Submitted: {c}</center> <div style="color:${colorTextTertiary}"> <center>{b}</center> </div>`
    },
    backgroundColor: 'transparent'
  }

  const optionsDevicesChart: EChartsOption = {
    grid: { top: 0, right: 0, bottom: 0, left: 0 },

    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: false
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          type: 'dashed',
          dashOffset: 5
        }
      }
      // show: false
    },
    series: [
      {
        data: [2000, 1300, 2600, 2800, 900, 3000, 2500],
        type: 'line',
        smooth: true
      }
    ],
    tooltip: {
      trigger: 'axis',
      position: 'top',
      className: 'customTooltip',
      backgroundColor: '#fff',
      formatter: `<center> {c} </center>`
    },
    backgroundColor: 'transparent',
    color: '#fff'
  }

  return (
    <>
      <PageHeader title='Overview' />
      <Row gutter={[20, 20]} className='dashboardPage'>
        <Col span={24} md={12} xxl={6}>
          <SummaryCard isRise={false} percentage={77.5} title='Users' value={233} />
        </Col>
        <Col span={24} md={12} xxl={6}>
          <SummaryCard isRise={true} percentage={54} title='contacts' value={365} />
        </Col>
        <Col span={24} md={12} xxl={6}>
          <SummaryCard isRise={false} percentage={55.0} title='Open Projects' value={877} />
        </Col>
        <Col span={24} md={12} xxl={6}>
          <SummaryCard
            isRise={false}
            percentage={0.55}
            title='Form Templates'
            value={921}
            reverse
          />
        </Col>

        <Col span={24} lg={16}>
          <Card>
            <Row justify='space-between'>
              <Col>
                <Typography.Title level={4}>Forms</Typography.Title>
              </Col>
              <Col>
                <Typography.Title level={4}>
                  <DatePicker.RangePicker
                    allowClear={false}
                    allowEmpty={[false, false]}
                    defaultPickerValue={[
                      dayjs(dayjs().startOf('week').format(dateFormat)),
                      dayjs()
                    ]}
                    defaultValue={[dayjs(dayjs().startOf('week').format(dateFormat)), dayjs()]}
                    format={dateFormat}
                  />
                </Typography.Title>
              </Col>
            </Row>
            <Row gutter={[20, 20]}>
              <Col span={24} md={12} xl={8} xxl={6}>
                <SummaryCardAlt isRise={false} title='Submitted' value={233} />
              </Col>
              <Col span={24} md={12} xl={8} xxl={6}>
                <SummaryCardAlt isSame isRise title='Submitted' value={233} />
              </Col>
              <Col span={24} md={12} xl={8} xxl={6}>
                <SummaryCardAlt isRise={true} title='Submitted' value={233} />
              </Col>
              <Col span={24}>
                <ReactECharts option={options} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24} lg={8}>
          <Card
            style={{ backgroundColor: colorPrimary, color: 'white' }}
            className='devicesRegisteredChartCard'
          >
            <Row justify='space-between'>
              <Col>
                <Typography.Title level={4} style={{ color: 'white' }}>
                  Devices Registered
                </Typography.Title>
              </Col>
              <Col>
                <Button icon={<FaEllipsis />} type='text' className='threeDotsButton' />
              </Col>
            </Row>
            <Row gutter={[20, 20]} style={{ marginTop: 24 }}>
              <Col span={24}>
                <Typography.Title level={1} style={{ color: 'white' }}>
                  233
                </Typography.Title>
              </Col>

              <Col span={24}>
                <ReactECharts option={optionsDevicesChart} />
              </Col>
              <Col>
                <Typography.Text style={{ color: 'white' }}>
                  Devices:{' '}
                  <Typography.Title level={4} style={{ color: 'white', display: 'inline-flex' }}>
                    700
                  </Typography.Title>
                </Typography.Text>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={8}>
          <Card className='activeUsersCard'>
            <Row>
              <Col>
                <Typography.Title level={4}>Active Users</Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Menu
                  items={userMenuItem}
                  key='_id'
                  className='activeUsersMenu'
                  selectable={false}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={8}>
          <Card className='onlineDevicesCard'>
            <Row justify='space-between'>
              <Col>
                <Typography.Title level={4} style={{ color: colorTextTertiary }}>
                  <FaApple /> Devices Online
                </Typography.Title>
              </Col>

              <Col>
                <Button icon={<FaEllipsis />} type='text' style={{ color: colorTextTertiary }} />
              </Col>
            </Row>

            <Row className='contentRow'>
              <Col span={24} className='center'>
                <Tag
                  color='default'
                  className='onlineDevicesTag'
                  style={{ color: colorTextTertiary }}
                >
                  <Typography.Title level={2} className='count'>
                    233
                  </Typography.Title>
                  /sessions
                </Tag>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={8}>
          <Card className='offlineDevicesCard'>
            <Row justify='space-between'>
              <Col>
                <Typography.Title level={4} style={{ color: colorTextTertiary }}>
                  <FaApple /> Devices Offline
                </Typography.Title>
              </Col>

              <Col>
                <Button icon={<FaEllipsis />} type='text' style={{ color: colorTextTertiary }} />
              </Col>
            </Row>

            <Row className='contentRow'>
              <Col span={24} className='center'>
                <Tag
                  color='default'
                  className='offlineDevicesTag'
                  style={{ color: colorTextTertiary }}
                >
                  <Typography.Title level={2} className='count'>
                    233
                  </Typography.Title>
                  /sessions
                </Tag>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
