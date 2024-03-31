import { ImagesBox, PageHeader } from '~/components'
import { Card, Col, Row, Tabs, Typography, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import CardProject from './CardProject'
import All from './Tabs/All'
import Border from '~/assets/icons/border-left.png'
import List from '~/assets/icons/List .png'
import Tick from '~/assets/icons/arrow-tick.png'
import Camera from '~/assets/icons/camera.png'
import './style.scss'
import { useParams } from 'react-router-dom'
import {
  useGetProjectByIdMutation,
  useUpdateProjectMutation
} from '~/store/services/project.service'
import { useUserSelector } from '~/store/hooks'
import { useUploadFileMutation } from '~/store/services/file.services'

const DetailProject = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('last7days')
  const [data, setData] = useState<any>(null)
  const { id } = useParams()
  const { user } = useUserSelector()
  const [getProjectById, { isLoading }] = useGetProjectByIdMutation()
  const fileRef = useRef<any>(null)
  const [uploadFile] = useUploadFileMutation()
  const [updateProject] = useUpdateProjectMutation()
  const [uploading, setUploading] = useState<boolean>(false)

  const fetchProjectById = (id: string) => {
    getProjectById({ id })
      .unwrap()
      .then((res) => {
        setData(res.data)
      })
      .catch((err: any) => {
        message.error(err?.data?.error || 'Failed to load project data')
      })
  }

  useEffect(() => {
    if (id) {
      fetchProjectById(id)
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
          All <span className='tab-count'>{data?.project.sheets.length}</span>
        </span>
      ),
      key: '1',
      children: <All data={data?.project.sheets || []} isLoading={isLoading} />
    }
  ]

  const handleUpload = (formData: FormData) => {
    const previousSheets = data?.project.sheets.map((item: { _id: string }) => item._id)

    setUploading(true)
    message.info('Please wait, Sheet is being uploaded')
    uploadFile({ type: 'project', folderName: 'project-sheet', formData })
      .unwrap()
      .then((res: any) => {
        updateProject({ id, sheets: [res.data.file._id, ...previousSheets] })
          .unwrap()
          .then(() => {
            setUploading(false)
            fetchProjectById(id as string)
          })
          .catch((err) => {
            message.error(err?.data?.error)
          })
      })
      .catch((err: any) => {
        setUploading(false)
        message.error(err?.data?.error)
      })
  }

  const handleDateChange = (d: string | null) => {
    updateProject({ id, projectEndDate: d })
      .unwrap()
      .then((res) => {
        setUploading(false)
        fetchProjectById(id as string)
        message.success(res.message)
      })
      .catch((err) => {
        message.error(err?.data?.error)
      })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      handleUpload(formData)
    }
  }

  // if (uploading) {
  //   return <div>Loading ...</div>
  // }

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <PageHeader
          title={`Good Morning ${user?.name}`}
          buttonText=' Upload Sheet'
          btnLoader={uploading}
          selectValue={selectedFilter}
          onSelectChange={handleSelectChange}
          onButtonClick={() => fileRef.current.click()}
        />
      </Col>
      <input
        type='file'
        accept='.pdf'
        ref={fileRef}
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
      <Col span={24} lg={16}>
        <Row gutter={[20, 20]}>
          <CardProject
            handleSheetClick={() => fileRef.current.click()}
            handleDateChange={handleDateChange}
            projectDetails={data}
          />
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
