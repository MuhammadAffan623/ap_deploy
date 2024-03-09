import { Col, DatePicker, Menu, Row, Tag, Typography, theme } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import React, { CSSProperties, useEffect, useState } from 'react'
import { FaEllipsis } from 'react-icons/fa6'
import { Avatar, Button, Card, PageHeader, SummaryCard, SummaryCardAlt } from '~/components'
import { MenuItem, getMenuItem } from '~/utils/helper'
import DevicesStatusCard from './DevicesStatusCard'
import './styles.scss'
import {
  useActiveDeviceUserByIdQuery,
  useActiveUserByIdQuery,
  useContactUserByIdQuery,
  useCountUserByIdQuery,
  useDeviceUserByIdQuery,
  useGetChartDataMutation,
  useTempleteUserByIdQuery
} from '~/store/services/dashboard.services'

const dateFormat = 'DD MMM'

const Dashboard = () => {
  const { data: summaryContact } = useContactUserByIdQuery('')
  const { data: summaryActive } = useActiveUserByIdQuery('')
  const { data: summaryCount } = useCountUserByIdQuery('')
  const { data: summaryTemplete } = useTempleteUserByIdQuery('')
  const { data: summarydevice } = useDeviceUserByIdQuery('')
  const { data: summaryActiveDevice } = useActiveDeviceUserByIdQuery('')
  const [getChart, { data: chartOption }] = useGetChartDataMutation()
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs(), dayjs()])
  const getChartData = (data: any) => {
    const xAxisData = data?.data?.chartData.map((item: any) => {
      return item.date
    })
    const yAxisData = data?.data?.chartData.map((item: any) => {
      return item.totalCount
    })
    const options: EChartsOption = {
      grid: { top: 8, right: 0, bottom: 24, left: 50 },

      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: yAxisData,
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
    return options
  }

  useEffect(() => {
    getChart({
      startDate: dateRange[0]?.format('YYYY-MM-DDTHH:mm:ss'),
      endDate: dateRange[1]?.format('YYYY-MM-DDTHH:mm:ss')
    })
  }, [getChart, dateRange])

  const { useToken } = theme
  const {
    token: { colorTextTertiary, colorPrimary }
  } = useToken()

  const colorTextTertiaryStyles: CSSProperties = {
    color: colorTextTertiary
  }

  const [userMenuItem, setUsersMenuItems] = React.useState<MenuItem[]>([])

  useEffect(() => {
    const menuItemTemp = summaryActive?.data?.activeUsers.map((user: IUser) => {
      return getMenuItem(
        <Row justify='space-between'>
          <Col className='details-col'>
            <Typography.Paragraph className='mb-0' strong>
              {user?.name}
            </Typography.Paragraph>
            <Typography.Text style={colorTextTertiaryStyles}>PK</Typography.Text>
          </Col>
          <Col>
            <Tag
              color='blue'
              bordered={false}
              className='user-menu-button'
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
        '',
        <Avatar size='default' src={user?.avatar as string} name={user?.name as string} />,
        null,
        'active-user'
      )
    })

    setUsersMenuItems(menuItemTemp)
  }, [summaryActive])

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
      <Row gutter={[20, 20]} className='dashboard-page'>
        <Col span={24} md={12} xxl={6}>
          <SummaryCard
            isRise={false}
            percentage={77.5}
            title='Users'
            value={summaryActive?.data?.usersCount}
          />
        </Col>
        <Col span={24} md={12} xxl={6}>
          <SummaryCard
            isRise={true}
            percentage={54}
            title='contacts'
            value={summaryContact?.data?.totalContacts}
          />
        </Col>
        <Col span={24} md={12} xxl={6}>
          <SummaryCard
            isRise={false}
            percentage={55.0}
            title='Open Projects'
            value={summaryCount?.data?.totalProjects}
          />
        </Col>
        <Col span={24} md={12} xxl={6}>
          <SummaryCard
            isRise={false}
            percentage={0.55}
            title='Form Templates'
            value={summaryTemplete?.data?.totalTemplates}
            reverse
          />
        </Col>

        <Col span={24} lg={16}>
          <Card className='forms-line-chart-card'>
            <Row justify='space-between'>
              <Col>
                <Typography.Title level={4}>Forms</Typography.Title>
              </Col>
              <Col>
                <Typography.Title level={4}>
                  <DatePicker.RangePicker
                    allowClear={false}
                    allowEmpty={[false, false]}
                    value={dateRange}
                    onChange={(value) => {
                      setDateRange([value?.[0] ?? dayjs(), value?.[1] ?? dayjs()])
                    }}
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
                <ReactECharts option={getChartData?.(chartOption)} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24} lg={8}>
          <Card style={{ backgroundColor: colorPrimary }} className='devices-registered-chart-card'>
            <Row justify='space-between'>
              <Col>
                <Typography.Title level={4} className='text-white'>
                  Devices Registered
                </Typography.Title>
              </Col>
              <Col>
                <Button icon={<FaEllipsis />} type='text' className='three-dots-button' />
              </Col>
            </Row>
            <Row gutter={[20, 20]} className='title-count'>
              <Col span={24}>
                <Typography.Title level={1} className='text-white'>
                  {summarydevice?.data?.devices}
                </Typography.Title>
              </Col>

              <Col span={24}>
                <ReactECharts option={optionsDevicesChart} />
              </Col>
              <Col>
                <Typography.Text className='text-white'>
                  Devices:{' '}
                  <Typography.Title level={4} className='registered-devices-count'>
                    {summarydevice?.data?.devices}
                  </Typography.Title>
                </Typography.Text>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24} md={12} xl={8}>
          <Card className='active-users-card'>
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
                  className='active-users-menu'
                  selectable={false}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24} md={12} xl={8}>
          <DevicesStatusCard status='online' count={summaryActiveDevice?.data?.onlineDevices} />
        </Col>

        <Col span={24} md={12} xl={8}>
          <DevicesStatusCard status='offline' count={summaryActiveDevice?.data?.offlineDevices} />
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
