import { CSSProperties, useState } from 'react'
import { Col, Form, Row, Typography, message } from 'antd'
import { Button, TextArea, TextField } from '~/components'
import { BsCheck, BsX } from 'react-icons/bs'
import { colorsToHex } from '~/utils/helper'
import './styles.scss'
import { useCreateCalenderMutation } from '~/store/services/calender.service'

interface IProps {
  handleClose: () => void
}

const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'gray', 'orange', 'pink', 'indigo']
const hexaColos = colorsToHex(colors)

const AddNewCalender = ({ handleClose }: IProps) => {
  const initialValues = {
    name: '',
    description: '',
    color: ''
  }
  const [form] = Form.useForm()
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null)
  const [createCalender, { isLoading }] = useCreateCalenderMutation()

  const handleFormSubmit = (values: any) => {
    createCalender(values)
      .unwrap()
      .then((res) => {
        message.success(res.message)
        handleClose()
      })
      .catch((err: any) => message.error(err?.data?.error))
  }

  const beforePseudoStyles: CSSProperties = {
    content: '""',
    display: 'block',
    width: '100%',
    height: '4px',
    position: 'absolute',
    top: '-4px',
    left: '0',
    borderRadius: '4px 4px 0 0'
  }

  return (
    <div className='new-calender-modal'>
      <Button onClick={handleClose} className='new-calender-close'>
        <BsX />
      </Button>
      <Typography.Title level={3}>New Calender</Typography.Title>
      <Form
        form={form}
        initialValues={initialValues}
        layout='vertical'
        onFinish={handleFormSubmit}
        className='add-edit-event-form'
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <TextField name='name' label='Name' placeholder='Enter Calender Name' required />
          </Col>

          <Col span={24}>
            <TextArea
              name='description'
              label='Description'
              placeholder='Enter Calender Description'
              required
            />
          </Col>

          <Col span={24}>
            <Form.Item
              label='Color'
              name='color'
              rules={[{ required: true, message: 'Please pick a Color' }]}
              className='formItem'
            >
              <div className='new-calender-colors'>
                {hexaColos.map((color, index) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  <div
                    className='new-calender-color-box'
                    style={{ backgroundColor: `${color + 70}` }}
                    key={index}
                    onClick={() => {
                      setSelectedColorIndex(index)
                      form.setFieldValue('color', color)
                    }}
                    role='checkbox'
                    aria-checked='mixed'
                    tabIndex={-1}
                  >
                    <div style={{ ...beforePseudoStyles, backgroundColor: color }}></div>
                    {selectedColorIndex === index && (
                      <div className='color-check'>
                        <BsCheck color='white' fontSize={32} />{' '}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Form.Item>
          </Col>

          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type='primary' htmlType='submit' block loading={isLoading}>
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AddNewCalender
