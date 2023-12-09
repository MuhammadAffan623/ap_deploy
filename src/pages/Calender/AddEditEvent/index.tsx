import { useEffect } from 'react'
import { Checkbox, Col, Form, Row, Typography } from 'antd'
import { BasicModal, Button, ColorIcon, CustomSelect, TextArea, TextField } from '~/components'
import { EventInput } from '@fullcalendar/core'
import { DatePicker } from 'antd'
import { IItem } from '~/components/Inputs/CustomSelect'
import dayjs from 'dayjs'
import './styles.scss'

const { RangePicker } = DatePicker

interface IProps {
  open: boolean
  handleClose: (status: boolean) => void
  isEdit?: boolean
  event: Partial<EventInput> | null
}

const items: IItem[] = [
  {
    key: 'liniting-schedule',
    label: 'Liniting schedule',
    color: 'tomato',
    icon: <ColorIcon color='tomato' mr='4px' />
  },
  {
    key: 'jax-schedule',
    label: 'JAX schedule',
    color: 'green',
    icon: <ColorIcon color='green' mr='4px' />
  },
  {
    key: 'tpa-schdule',
    label: 'TPA schdule',
    color: 'blue',
    icon: <ColorIcon color='blue' mr='4px' />
  }
]

const AddEditEvent = ({ event, handleClose, open, isEdit = false }: IProps) => {
  const initialValues = {
    title: '',
    description: '',
    range: '',
    startAt: '',
    endAt: '',
    repeat: false,
    allDay: false,
    calender: ''
  }
  const [form] = Form.useForm()

  const handleFormSubmit = (values: any) => {
    if (isEdit) {
      console.log(values)
    } else {
      const modifiedObj = {
        ...values,
        startAt: dayjs(values.range[0]).format('YYYY-MM-DD HH:mm'),
        endAt: dayjs(values.range[1]).format('YYYY-MM-DD HH:mm')
      }

      console.log(modifiedObj)
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      title: event?.title,
      description: event?.description,
      start: event?.start,
      end: event?.end
    })
  }, [event])

  return (
    <BasicModal
      open={open}
      onCancel={() => {
        handleClose(false)
      }}
    >
      <Typography.Title level={3}>New event</Typography.Title>
      <Form
        form={form}
        initialValues={initialValues}
        layout='vertical'
        onFinish={handleFormSubmit}
        className='add-edit-event-form'
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <TextField name='title' label='Title' placeholder='Enter Event Title' required />
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
              <RangePicker showTime style={{ width: '100%' }} />
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
                options={items}
              />
            </Form.Item>
          </Col>

          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type='primary' htmlType='submit'>
              {isEdit ? 'Update' : 'Add'} event
            </Button>
          </Col>
        </Row>
      </Form>
    </BasicModal>
  )
}

export default AddEditEvent
