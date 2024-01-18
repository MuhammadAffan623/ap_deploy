import { Col, Form, Row, Typography, message, theme } from 'antd'
import { CSSProperties, useEffect } from 'react'
import { Avatar, BasicModal, Button, SelectField, TextArea, TextField } from '~/components'
import './styles.scss'
import {
  useCreateUserByIdMutation,
  useUpdateUserByIdMutation
} from '~/store/services/contact.services'
import toast from '~/store/toast'
import { getCountries } from 'country-state-picker'

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

  const handleFormSubmit = (body: any) => {
    console.log(body)
    const newObj = { ...body, phone: body.countryCode + body.phone }
    console.log(newObj)
    if (isEdit) {
      updateUserById({
        id: contact?._id,
        body: newObj
      })
        .unwrap()
        .then((res) => {
          message.success(res?.data?.message ?? 'Contact updated successfully')
          handleClose(true)
        })
        .catch((err) => {
          message.error(err?.data?.error ?? 'Something went wrong')
        })
    } else {
      createUserById({ ...body, phone: body.countryCode + body.phone })
        .unwrap()
        .then((res) => {
          message?.success(res?.data?.message ?? 'Contact created successfully')
          handleClose(true)
        })
        .catch((err) => {
          message.error(err?.data?.error ?? 'Something went wrong')
        })
    }
  }

  const [updateUserById, { isLoading: updateUserLoading }] = useUpdateUserByIdMutation()
  const [createUserById, { isLoading: createUserLoading }] = useCreateUserByIdMutation()

  useEffect(() => {
    form.setFieldsValue({
      name: contact?.name ?? '',
      email: contact?.email,
      phone: contact?.phone,
      role: contact?.role,
      address: contact?.address,
      jobTitle: contact?.jobTitle,
      division: contact?.division,
      notes: contact?.notes
    })
  }, [contact])

  return (
    <BasicModal
      open={open}
      onCancel={() => {
        handleClose(false)
      }}
    >
      <Typography.Title level={3}>{isEdit ? 'Edit' : 'Add'} Contact</Typography.Title>
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

          <Col span={12}>
            <TextField name='name' label='Full Name *' placeholder='Enter full name' required />
          </Col>

          <Col span={12}>
            <TextField name='email' label='Email *' placeholder='Enter email' required />
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

          <Col span={24}>
            <TextField name='jobTitle' label='Job Title *' placeholder='Enter job title' required />
          </Col>

          <Col span={24}>
            <TextField name='address' label='Address *' placeholder='Address' required />
          </Col>

          <Col span={24}>
            <TextField name='division' label='Division *' placeholder='Division' required />
          </Col>

          <Col span={24}>
            <TextArea name='notes' label='Notes *' placeholder='Notes' />
          </Col>

          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              type='primary'
              htmlType='submit'
              loading={createUserLoading || updateUserLoading}
            >
              {isEdit ? 'Update' : 'Add'} Contact
            </Button>
          </Col>
        </Row>
      </Form>
    </BasicModal>
  )
}

export default AddEditContact
