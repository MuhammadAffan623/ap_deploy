import { Col, Form, Row, Typography, theme } from 'antd'
import { getCountries } from 'country-state-picker'
import { CSSProperties, useEffect } from 'react'
import { Avatar, BasicModal, Button, SelectField, TextArea, TextField } from '~/components'
import './styles.scss'

interface IAddEditContactProps {
  open: boolean
  handleClose: (status: boolean) => void
  isEdit?: boolean
  contact: Partial<IUser>
}

const getAvatarContainerStyle = (borderColor: string): CSSProperties => {
  return {
    width: 100,
    height: 100,
    border: `2px dashed ${borderColor}`,
    background: 'transparent',
    color: borderColor,
    fontSize: 40,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }
}
const AddEditContact = ({ contact, handleClose, open, isEdit = false }: IAddEditContactProps) => {
  const [form] = Form.useForm()
  const { useToken } = theme

  const {
    token: { colorTextTertiary }
  } = useToken()

  const handleFormSubmit = (values: any) => {
    if (isEdit) {
      console.log(values)
    } else {
      console.log(values)
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      firstName: contact.name?.split(' ')[0],
      lastName: contact.name?.split(' ')[1],
      email: contact.email,
      countryCode: '',
      phoneNumber: contact.phoneNumber,
      role: contact.role,
      phone: contact.phoneNumber
    })
  }, [contact])

  return (
    <BasicModal
      open={open}
      onCancel={() => {
        handleClose(false)
      }}
    >
      <Typography.Title level={3}>New Contact</Typography.Title>
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFormSubmit}
        className='add-edit-contact-form'
      >
        <Row gutter={[16, 16]}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Avatar
              src='#'
              name='+'
              shape='square'
              style={getAvatarContainerStyle(colorTextTertiary)}
            />
          </Col>

          <Col span={24} md={12}>
            <TextField
              name='firstName'
              label='First Name'
              placeholder='Enter first name'
              required
            />
          </Col>
          <Col span={24} md={12}>
            <TextField name='lastName' label='Last Name' placeholder='Enter last name' required />
          </Col>

          <Col span={24}>
            <TextField name='email' label='Email' placeholder='Enter email' required />
          </Col>

          <Col span={24}>
            <Row gutter={[20, 10]}>
              <Col span={24}>
                <Typography.Text style={{ color: colorTextTertiary }}>Phone</Typography.Text>
              </Col>
              <Col span={24}>
                <Row className='phone-number-combined-field'>
                  <SelectField
                    name='countryCode'
                    options={getCountries().map(
                      ({ code, dial_code }: { dial_code: string; code: string }) => ({
                        label: `${dial_code} - ${code.toUpperCase()}`,
                        value: dial_code
                      })
                    )}
                    inverseBg
                    placeholder='code'
                    defaultActiveFirstOption
                    formItemClass='country-code-select-field'
                    style={{ border: 'none', width: '100%' }}
                  />
                  <TextField
                    name='phone'
                    placeholder='Enter phone'
                    required
                    formItemClass='phone-number-form-item'
                  />
                </Row>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <TextField name='jobTitle' label='Job Title' placeholder='Enter job title' required />
          </Col>

          <Col span={24}>
            <TextField name='address' label='Address' placeholder='Address' required />
          </Col>

          <Col span={24}>
            <TextField name='division' label='Division' placeholder='Division' required />
          </Col>

          <Col span={24}>
            <TextArea name='notes' label='Notes' placeholder='Notes' />
          </Col>

          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type='primary' htmlType='submit'>
              {isEdit ? 'Update' : 'Add'} Contact
            </Button>
          </Col>
        </Row>
      </Form>
    </BasicModal>
  )
}

export default AddEditContact
