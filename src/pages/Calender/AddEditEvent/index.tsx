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
}

const defaultItems: IItem[] = [
  {
    key: 'liniting-schedule',
    label: 'Liniting schedule',
    color: 'tomato',
    icon: <ColorIcon color='tomato' mr='4px' />
  }
]

const AddEditEvent = ({ event, handleClose, open, isEdit = false }: IProps) => {
  const initialValues = {
    name: '',
    description: '',
    range: [],
    startTime: '',
    endTime: '',
    repeat: false,
    allDay: false,
    calender: ''
  }
  const [defaultValue, setDefaultValue] = useState<any>([])
  const [form] = Form.useForm()
  const { calenders } = useCalenderSelector()
  const [calendarItems, setCalenderItems] = useState(defaultItems)
  const [createEvent, { isLoading }] = useCreateEventMutation()
  const [updateEvent, { isLoading: isUpdateLoading }] = useUpdateEventMutation()

  const handleFormSubmit = (values: any) => {
    const modifiedObj = {
      startTime: dayjs(values.range[0]).format('YYYY-MM-DD HH:mm'),
      endTime: dayjs(values.range[1]).format('YYYY-MM-DD HH:mm'),
      name: values.name,
      allDay: values.allDay,
      description: values.description
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
      const startDate = dayjs(event.start?.toLocaleString(), 'YYYY-MM-DD HH:mm')
      const endDate = dayjs(event.start?.toLocaleString(), 'YYYY-MM-DD HH:mm')

      form.setFieldsValue({
        name: event.title,
        description: event.description,
        start: event.start,
        end: event.end
      })
      setDefaultValue([startDate, endDate])
    } else {
      form.resetFields()
    }
  }, [event])

  useEffect(() => {
    if (calenders) {
      const items = calenders.map((item) => ({
        key: item._id,
        label: item.name,
        color: item.color,
        icon: <ColorIcon color={item.color} mr='4px' />
      }))

      setCalenderItems(items)
    }
  }, [calenders])

  return (
    <BasicModal
      open={open}
      onCancel={() => {
        handleClose(false)
      }}
    >
      <Typography.Title level={3}>{isEdit ? 'Update event' : 'New event'}</Typography.Title>
      <Form
        form={form}
        initialValues={initialValues}
        layout='vertical'
        onFinish={handleFormSubmit}
        className='add-edit-event-form'
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <TextField name='name' label='Title' placeholder='Enter Event Title' required />
          </Col>

          <Col span={24}>
            <TextArea
              name='description'
              label='Description'
              placeholder='Enter Event Description'
              required
            />
          </Col>

          <Col span={24}>
            <Form.Item
              label='Time and Date'
              name='range'
              rules={[{ required: true }]}
              className='formItem'
            >
              <RangePicker defaultValue={defaultValue} showTime style={{ width: '100%' }} />
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
                handleChange={(value) => form.setFieldValue('calender', value)}
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
