import { useEffect, useState } from 'react'
import { Checkbox, Col, Form, Row, Typography, message } from 'antd'
import { BasicModal, Button, ColorIcon, CustomSelect, TextArea, TextField } from '~/components'
import { EventInput } from '@fullcalendar/core'
import { DatePicker } from 'antd'
import { IItem } from '~/components/Inputs/CustomSelect'
import dayjs from 'dayjs'
import './styles.scss'
import { useCalenderSelector } from '~/store/hooks'
import { useCreateEventMutation, useUpdateEventMutation } from '~/store/services/event.service'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker

interface IProps {
  open: boolean
  handleClose: (status: boolean) => void
  isEdit?: boolean
  event: Partial<EventInput> | null
  startDate?: any
}

const defaultItems: IItem[] = [
  {
    key: 'liniting-schedule',
    label: 'Liniting schedule',
    color: 'tomato',
    icon: <ColorIcon color='tomato' mr='4px' />
  }
]

const AddEditEvent = ({ event, handleClose, open, isEdit = false, startDate = '' }: IProps) => {
  const formatDate = 'YYYY-MM-DD HH:mm'
  const starting = dayjs(event && (event?.start as string)).format('YYYY-MM-DD HH:mm:ss')
  const ending = dayjs(event && (event?.end as string)).format('YYYY-MM-DD HH:mm:ss')

  const initialValues = {
    name: '',
    description: '',
    range: [],
    startTime: startDate,
    endTime: '',
    repeat: false,
    allDay: false,
    calender: '',
    range_picker:event ?[dayjs(starting, formatDate), dayjs(ending, formatDate)]: [],
  }
  const [form] = Form.useForm()

  const { calenders } = useCalenderSelector()
  const [calendarItems, setCalenderItems] = useState(defaultItems)
  const [createEvent, { isLoading }] = useCreateEventMutation()
  const [updateEvent, { isLoading: isUpdateLoading }] = useUpdateEventMutation()

  const handleFormSubmit = (values: any) => {
    const modifiedObj = {
      startTime: dayjs(values.range_picker[0]).format(formatDate),
      endTime: dayjs(values.range_picker[1]).format(formatDate),
      name: values.name,
      allDay: values.allDay,
      description: values.description,
      calendar: values.calender,
      backgroundColor: calenders.find((ele) => ele?._id === values.calender)?.color
    }
    if (isEdit) {
      updateEvent({ _id: event?.id, ...modifiedObj })
        .unwrap()
        .then(() => {
          message.success('event update successfully')
          form.resetFields()
          handleClose(false)
        })
        .catch((err) => message.error(err?.data?.error))
    } else {
      createEvent(modifiedObj)
        .unwrap()
        .then(() => {
          form.resetFields()
          message.success('event created successfully')
          handleClose(false)
        })
        .catch((err) => message.error(err?.data?.error))
    }
  }

  useEffect(() => {

    if (event) {
      form.setFieldsValue({
        name: event.title,
        description: event.description,
        start: event.start,
        end: event.end,
        range_picker:[dayjs(starting, formatDate), dayjs(ending, formatDate)],
        calender:event.calendar
      })
    } else {
      form.setFieldsValue({
        range_picker:[]
      })

      form.resetFields()
    }
  
  }, [event])

 
  

  useEffect(() => {
    if (calenders) {
      const items = calenders.map((item: any) => ({
        key: item._id,
        label: item.name,
        color: item.color,
        icon: <ColorIcon color={item.color} mr='4px' />
      }))

      setCalenderItems(items)
    }
  }, [calenders])

  // useEffect(() => {
  //   const startTime = dayjs(startDate, formatDate)
  //   const endTime = dayjs(startDate, formatDate)

  //   if (startDate) {
  //     form.setFieldValue('range_picker', [dayjs(starting, formatDate), dayjs(ending, formatDate)])
  //   } else {
  //     form.resetFields()
  //   }
  // }, [startDate, form])
  // const dateFormat = 'YYYY/MM/DD';

  // console.log(starting,"starting ")
  // console.log(ending,"ending ")
  return (
    <BasicModal
      open={open}
      onCancel={() => {
        handleClose(false)
      }}
    >
      <Typography.Title level={3}>{isEdit ? 'Update Event' : 'New Event'}</Typography.Title>
      <Form
        form={form}
        initialValues={initialValues}
        layout='vertical'
        onFinish={handleFormSubmit}
        className='add-edit-event-form'
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <TextField name='name' label='Title*' placeholder='Enter Event Title' required />
          </Col>

          <Col span={24}>
            <TextArea
              name='description'
              label='Description*'
              placeholder='Enter Event Description'
              required
            />
          </Col>

          <Col span={24}>
            <Form.Item
              label='Time and Date*'
              // name='range'
              // name={['range', 'dates']}
              name='range_picker'
              rules={[{ required: false }]}
              // rules={[{ type: 'array', required: true, message: 'Please select time and date!' }]}

              className='formItem'
            >
              <RangePicker
                showTime
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label='' name='allDay' valuePropName='checked' className='formItem'>
              <Checkbox>All day</Checkbox>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label='' name='repeat' valuePropName='checked' className='formItem'>
              <Checkbox>Repeat</Checkbox>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label='Calender' name='calender' className='formItem'>
              <CustomSelect
                handleChange={(value) => {
                  form.setFieldValue('calender', value)
                }}
                options={calendarItems}
                placeholder='Select a calendar'
              />
            </Form.Item>
          </Col>

          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type='primary' htmlType='submit' loading={isLoading || isUpdateLoading}>
              {isEdit ? 'Update' : 'Add'} event
            </Button>
          </Col>
        </Row>
      </Form>
    </BasicModal>
  )
}

export default AddEditEvent
