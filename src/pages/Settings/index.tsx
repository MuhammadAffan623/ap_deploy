import { Col, Form, Row, Typography, theme } from 'antd'
import { Avatar, Button, Card, ImagesBox, PageHeader, SelectField, TextField } from '~/components'
import './style.scss'
import { getCountries } from 'country-state-picker'
import { CSSProperties } from 'react'
import userImg from '~/assets/images/user.png'
import editIcon from '~/assets/icons/edit.svg'

const getAvatarContainerStyle = (borderColor: string): CSSProperties => {
  return {
    width: '100%',
    height: '100%',
    border: `2px dashed ${borderColor}`,
    background: 'transparent',
    color: borderColor,
    fontSize: 40,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    padding: '16px'
  }
}

const Settings = () => {
  const [form] = Form.useForm()
  const { useToken } = theme

  const {
    token: { colorTextTertiary }
  } = useToken()

  const handleFormSubmit = (values: any) => {
    console.log(values)
  }
  return (
    <div>
      <PageHeader title='Profile Setting' />
      <Card>
        <Row
          gutter={[
            { xs: 8, lg: 0 },
            { xs: 16, sm: 16, md: 16, lg: 0 }
          ]}
        >
          <Col xs={{ span: 24, order: 2 }} md={{ span: 18, order: 1 }}>
            <div className='profile-form'>
              <Form
                form={form}
                layout='vertical'
                onFinish={handleFormSubmit}
                className='add-edit-contact-form'
              >
                <Row gutter={[16, 16]}>
                  <Col span={24} md={12}>
                    <TextField
                      name='firstName'
                      label='First Name'
                      placeholder='Enter first name'
                      required
                    />
                  </Col>
                  <Col span={24} md={12}>
                    <TextField
                      name='lastName'
                      label='Last Name'
                      placeholder='Enter last name'
                      required
                    />
                  </Col>

                  <Col span={24}>
                    <TextField name='email' label='Email' placeholder='Enter email' required />
                  </Col>

                  <Col span={24}>
                    <Row gutter={[20, 10]}>
                      <Col span={24}>
                        <Typography.Text style={{ color: colorTextTertiary }}>
                          Phone
                        </Typography.Text>
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
                    <TextField
                      name='oldPassword'
                      label='Change Password'
                      placeholder='Old Password'
                      type='password'
                      required
                    />
                  </Col>

                  <Col span={24}>
                    <TextField
                      name='newPassword'
                      placeholder='New Password'
                      type='password'
                      required
                    />
                  </Col>

                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type='primary' htmlType='submit'>
                      Save changes
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col xs={{ span: 24, order: 1 }} md={{ span: 6, order: 2 }}>
            <div className='profile-image-container'>
              <div className='edit-circle'>
                <ImagesBox src={editIcon} width={60} height={60} />
              </div>
              <Avatar
                src={userImg}
                name='+'
                shape='square'
                style={getAvatarContainerStyle(colorTextTertiary)}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Settings
