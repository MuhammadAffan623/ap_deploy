import { Checkbox, Col, Form, Row, Tag, Typography, theme } from 'antd'
import { getCountries } from 'country-state-picker'
import { CSSProperties, useEffect } from 'react'
import { FaCrown } from 'react-icons/fa6'
import { Avatar, BasicModal, Button, SelectField, TextField } from '~/components'
import ActiveDevice from './ActiveDevice'
import './styles.scss'

interface IAddEditUserInGroupProps {
  open: boolean
  handleClose: (status: boolean) => void
  isEdit?: boolean
  user: IUser
  groups: Partial<IUserGroup>[]
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
const AddEditUserInGroup = ({
  user,
  groups = [],
  handleClose,
  open,
  isEdit = false
}: IAddEditUserInGroupProps) => {
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
      firstName: user?.name?.split(' ')[0],
      lastName: user?.name?.split(' ')[1],
      email: user?.email,
      countryCode: '+92',
      phoneNumber: user.phoneNumber,
      role: user.role,
      groups: user.groups ?? [],
      avatarUrl: user?.avatarUrl,
      activeDevices: user?.activeDevices ?? []
    })
  }, [user])

  return (
    <BasicModal
      open={open}
      onCancel={() => {
        handleClose(false)
      }}
    >
      <Typography.Title level={3}>{isEdit ? 'Edit' : 'New'} Contact</Typography.Title>

      <Form
        form={form}
        layout='vertical'
        onFinish={handleFormSubmit}
        className='add-edit-user-group-form'
      >
        <Row gutter={[16, 16]}>
          <Col span={24} className='center'>
            <Avatar
              src={(user?.avatarUrl as string) ?? '#'}
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
            <SelectField
              label='Add Group(s)'
              name='groups'
              className='groups-multiple-select'
              mode='multiple'
              options={groups.map((item) => ({
                label: item?.name,
                value: item._id
              }))}
              placeholder='Select Groups'
            />
          </Col>

          {isEdit ? (
            <>
              <Col span={24}>
                <Row align='middle'>
                  <Col span={12}>
                    <Button type='primary' danger htmlType='submit'>
                      Change Password
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Checkbox name='sso'>Enable SSO</Checkbox>
                  </Col>
                </Row>
              </Col>

              <Col>
                <Row gutter={20} align='middle'>
                  <Col span={24}>
                    <Typography.Text>
                      Active Device(s) {user?.activeDevices?.length.toString()}
                    </Typography.Text>
                  </Col>
                  {user?.activeDevices?.map((device) => {
                    return (
                      <ActiveDevice
                        key={device?.lastSync}
                        device={device}
                        onLogoutClick={() => {
                          console.log('logout')
                        }}
                      />
                    )
                  })}
                </Row>
              </Col>
            </>
          ) : (
            <>
              <Col span={24}>
                <TextField name='password' label='Password' placeholder='Password' required />
              </Col>

              <Col span={24}>
                <TextField
                  name='confirmPassword'
                  label='Confirm Password'
                  placeholder='Confirm Password'
                  required
                />
              </Col>

              <Col span={1}></Col>
              <Col span={22} className='password-note'>
                <Typography.Paragraph>
                  Make sure your password has between 8 and 50 characters and includes: one
                  uppercase and lowercase letter, one number and one special character. Passwords
                  must match
                </Typography.Paragraph>
              </Col>
              <Col span={1}></Col>
            </>
          )}
          <Col span={24}>
            <Tag color='gold'>
              Enabling the Super Admin to have full access to the entire system.
            </Tag>
          </Col>

          <Col span={24} style={{ textAlign: 'right' }}>
            <Row justify='space-between'>
              <Col>
                <Row gutter={20} align='middle'>
                  <Col>
                    <FaCrown style={{ fontSize: '2rem' }} />{' '}
                  </Col>
                  <Col>
                    <Checkbox name='superAdmin'>Enable Super Admin</Checkbox>
                  </Col>
                </Row>
              </Col>

              <Col>
                <Button type='primary' htmlType='submit'>
                  {isEdit ? 'Update' : 'Add'} Contact
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </BasicModal>
  )
}

export default AddEditUserInGroup
