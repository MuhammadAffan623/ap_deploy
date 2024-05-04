import { Col, Divider, Form, Row, Skeleton, Typography, message, theme } from 'antd'
import { Avatar, Button, Card, ImagesBox, PageHeader, SelectField, TextField } from '~/components'
import './style.scss'
import { getCountries } from 'country-state-picker'
import { CSSProperties, useEffect, useState } from 'react'
import userImg from '~/assets/images/user.png'
import editIcon from '~/assets/icons/edit.svg'
import { useUpdatePasswordMutation, useUpdateProfileMutation } from '~/store/services/auth.services'
import { useGetFileMutation, useUploadFileMutation } from '~/store/services/file.services'
import { useUserSelector } from '~/store/hooks'

const getAvatarContainerStyle = (borderColor: string): CSSProperties => {
  return {
    width: '100%',
    height: '100%',
    minHeight: '200px',
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
  const [form2] = Form.useForm()
  const { useToken } = theme

  const {
    token: { colorTextTertiary }
  } = useToken()
  const { user } = useUserSelector()
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | ArrayBuffer | null>('')
  const [uploading, setUploading] = useState<boolean>(false)

  const [updatePassword, { isLoading: isPasswordLoading }] = useUpdatePasswordMutation()
  const [updateProfile, { isLoading: isProfileLoading }]: any = useUpdateProfileMutation()
  const [uploadFile]: any = useUploadFileMutation()
  const [getFile]: any = useGetFileMutation()

  useEffect(() => {
    if (user) {
      const namesArray = user.name.split(' ')
      const firstName = namesArray[0] || ''
      const lastName = namesArray.slice(1).join(' ') || ''
      setUploadedImgUrl(user.avatar as string)
      form.setFieldsValue({
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        phoneNo: user.phoneNo
      })
    }
  }, [user])

  const handleUpload = (formData: FormData) => {
    setUploading(true)
    message.info('Please wait, file is being uploaded')
    uploadFile({ type: 'profile', folderName: 'setting', formData })
      .unwrap()
      .then((res: any) => {
        const params = {
          key: res.data.uploadedFile.key,
          versionId: res.data.uploadedFile.s3VersionId
        }
        getFile(params)
          .unwrap()
          .then((response: any) => {
            setUploading(false)
            setUploadedImgUrl(response.data)
            message.success('File uploaded successfully')
          })
          .catch((error: any) => {
            setUploading(false)
            message.error(error?.data?.error)
          })
      })
      .catch((err: any) => {
        setUploading(false)
        message.error(err?.data?.error)
      })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      handleUpload(formData)
    }
  }
  const handleFormSubmit = (values: any) => {
    const body = {
      id: user?._id,
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phoneNo: values.phoneNo,
      avatar: uploadedImgUrl
    }

    updateProfile(body)
      .unwrap()
      .then((res: any) => {
        message.success(res?.message)
      })
      .catch((err: any) => {
        message.error(err?.data?.error)
      })
  }

  const handleUpdatePassword = (values: any) => {
    updatePassword(values)
      .unwrap()
      .then((res) => {
        form2.resetFields()
        message.success(res.message)
      })
      .catch(() => {
        message.error('Failed to reset password')
      })
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
                      label='First Name*'
                      placeholder='Enter first name'
                      required
                    />
                  </Col>
                  <Col span={24} md={12}>
                    <TextField
                      name='lastName'
                      label='Last Name*'
                      placeholder='Enter last name'
                      required
                    />
                  </Col>

                  <Col span={24}>
                    <TextField
                      name='email'
                      type='email'
                      label='Email*'
                      placeholder='Enter email'
                      required
                    />
                  </Col>

                  <Col span={24}>
                    <Row gutter={[20, 10]}>
                      <Col span={24}>
                        <Typography.Text style={{ color: colorTextTertiary }}>
                          Phone*
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
                            name='phoneNo'
                            placeholder='Enter phone'
                            required
                            formItemClass='phone-number-form-item'
                          />
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type='primary' htmlType='submit' loading={isProfileLoading}>
                      Update Profile
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>

            <Divider />
            <div className='profile-form'>
              <Form
                form={form2}
                layout='vertical'
                onFinish={handleUpdatePassword}
                className='add-edit-contact-form'
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <TextField
                      name='currentPassword'
                      label='Change Password'
                      placeholder='Current Password'
                      type='password'
                      required
                    />
                  </Col>

                  <Col span={24}>
                    <TextField
                      name='password'
                      placeholder='New Password'
                      type='password'
                      required
                    />
                  </Col>

                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type='primary' htmlType='submit' loading={isPasswordLoading}>
                      Change Password
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col xs={{ span: 24, order: 1 }} md={{ span: 6, order: 2 }}>
            <div className='setting-profile-image-container'>
              {uploading ? (
                <Skeleton.Image active={uploading} className='img-placeholder' />
              ) : (
                <>
                  <label className='edit-circle'>
                    <ImagesBox src={editIcon} width={40} height={40} />
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </label>

                  <Avatar
                    src={(uploadedImgUrl as string) ?? userImg}
                    name=''
                    shape='square'
                    style={getAvatarContainerStyle(colorTextTertiary)}
                    rootClassName='profile-avatar'
                  />
                </>
              )}
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Settings
