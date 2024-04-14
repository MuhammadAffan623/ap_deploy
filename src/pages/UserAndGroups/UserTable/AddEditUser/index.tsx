import { Checkbox, Col, Form, Row, Skeleton, Tag, Typography, message, theme } from 'antd'
import { getCountries } from 'country-state-picker'
import { CSSProperties, useEffect, useState } from 'react'
import { FaCrown } from 'react-icons/fa6'
import editIcon from '~/assets/icons/edit.svg'
import userImg from '~/assets/images/user.png'
import { Avatar, BasicModal, Button, ImagesBox, SelectField, TextField } from '~/components'
import {
  useRegisterMutation,
  useUpdateProfileSpecificUserMutation
} from '~/store/services/auth.services'
import { useGetFileMutation, useUploadFileMutation } from '~/store/services/file.services'
import './styles.scss'

interface IAddEditUserInGroupProps {
  open: boolean
  handleClose: (status: boolean) => void
  isEdit?: boolean
  user: IUser | null
  groups: Partial<IUserGroup>[]
  refetch: () => void
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
  isEdit = false,
  refetch
}: IAddEditUserInGroupProps) => {
  const [form] = Form.useForm()
  const isAdmin = Form.useWatch('enableSuperAdmin', form)
  const { useToken } = theme
  const [uploading, setUploading] = useState<boolean>(false)
  const [changePassShow, setChangePassShow] = useState(false)

  const [uploadFile]: any = useUploadFileMutation()
  const [getFile]: any = useGetFileMutation()
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | null>(user?.avatar as string)

  const {
    token: { colorTextTertiary }
  } = useToken()

  const [registerUser, { isLoading: isAddLoading }] = useRegisterMutation()
  // const [updateProfile, { isLoading: isUpdateLoading }]: any = useUpdateProfileMutation()
  const [updateProfileSpecificUser, { isLoading: isUpdateLoading }]: any =
    useUpdateProfileSpecificUserMutation()

  const [numberCode, setNumberCode] = useState([])

  const handleFormSubmit = (values: any) => {
    const body = {
      ...values,
      name: values.firstName + ' ' + values.lastName,
      avatar: uploadedImgUrl ?? user?.avatar ?? ''
    }
    if (isEdit) {
      updateProfileSpecificUser({ id: user?._id, ...body })
        .unwrap()
        .then((res: any) => {
          message.success(res?.message)
          handleClose(false)
          refetch()
        })
        .catch((err: any) => {
          message.error(err?.data?.error)
        })
    } else {
      registerUser(body)
        .unwrap()
        .then((res) => {
          handleClose(false)
          refetch()
          form.resetFields()
          setUploadedImgUrl(null)
          message.success(res.message)
        })
        .catch((err) => {
          message.error(err?.data?.error)
        })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      handleUpload(formData)
    }
  }

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
  useEffect(() => {
    const numCode = getCountries().filter(
      ({ code, dial_code }: { dial_code: string; code: string }) => {
        if (code !== 'cx') {
          return {
            label: `${dial_code} - ${code.toUpperCase()}`,
            value: dial_code
          }
        }
      }
    )

    setNumberCode(numCode)
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      firstName: user?.name?.split(' ')[0],
      lastName: user?.name?.split(' ')[1],
      email: user?.email,
      countryCode: '+92',
      phoneNo: user?.phoneNo,
      role: user?.role,
      group: user?.group?._id ?? null,
      avatar: user?.avatar ?? '',
      activeDevices: user?.activeDevices ?? [],
      enableSuperAdmin: user?.userType === 'Admin' ? true : false
    })
    setUploadedImgUrl(user?.avatar as string)

    return () => {
      form.resetFields()
      setUploadedImgUrl('')
    }
  }, [user])
  return (
    <BasicModal
      open={open}
      onCancel={() => {
        handleClose(false)
      }}
    >
      <Typography.Title level={3}> {isEdit ? 'Edit' : 'Add New'} User</Typography.Title>

      <Form
        form={form}
        layout='vertical'
        onFinish={handleFormSubmit}
        className='add-edit-user-group-form'
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name='avatar'
              label='Avatar'
              rules={[
                {
                  required: true,
                  message: 'Please upload an avatar.'
                }
              ]}
            >
              <div className='profile-image-container'>
                {uploading ? (
                  <Skeleton.Image active={uploading} className='img-placeholder' />
                ) : (
                  <>
                    <label className='edit-circle'>
                      <ImagesBox src={editIcon} width={30} height={30} />
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
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <TextField
              name='firstName'
              label='First Name*'
              placeholder='Enter first name'
              required
            />
          </Col>
          <Col span={24} md={12}>
            <TextField name='lastName' label='Last Name*' placeholder='Enter last name' required />
          </Col>

          <Col span={24}>
            <TextField name='email' label='Email*' placeholder='Enter email' required />
          </Col>

          <Col span={24}>
            <Row gutter={[20, 10]}>
              <Col span={24}>
                <Typography.Text style={{ color: colorTextTertiary }}>Phone*</Typography.Text>
              </Col>
              <Col span={24}>
                <Row className='phone-number-combined-field'>
                  <SelectField
                    name='countryCode'
                    options={numberCode.map(
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

          {!isAdmin && (
            <Col span={24}>
              <SelectField
                label='Add Group(s)*'
                name='group'
                className='groups-multiple-select'
                // mode='multiple'
                options={groups.map((item) => ({
                  label: item?.name,
                  value: item._id
                }))}
                placeholder='Select Groups'
                required
              />
            </Col>
          )}
          {changePassShow && (
            <>
              <Col span={24} md={12}>
                <TextField name='password' label='Password*' placeholder='Password' required />
              </Col>

              <Col span={24} md={12}>
                <TextField
                  name='confirmPassword'
                  label='Confirm Password*'
                  placeholder='Confirm Password'
                  required
                />
              </Col>
            </>
          )}

          {isEdit ? (
            <>
              <Col span={24}>
                <Row align='middle'>
                  <Col span={12}>
                    <Button
                      onClick={() => setChangePassShow((prev) => !prev)}
                      type='primary'
                      danger
                    >
                      {changePassShow ? 'Remove Change Password' : 'Change Password'}
                    </Button>
                  </Col>
                  {/* <Col span={12}>
                    <Checkbox name='sso'>Enable SSO</Checkbox>
                  </Col> */}
                </Row>
              </Col>

              {/* <Col>
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
                          // console.log('logout')
                        }}
                      />
                    )
                  })}
                </Row>
              </Col> */}
            </>
          ) : (
            <>
              <Col span={24} md={12}>
                <TextField name='password' label='Password*' placeholder='Password' required />
              </Col>

              <Col span={24} md={12}>
                <TextField
                  name='confirmPassword'
                  label='Confirm Password*'
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
                    <Form.Item name='enableSuperAdmin' valuePropName='checked'>
                      <Checkbox>Enable Super Admin</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col>
                <Button type='primary' htmlType='submit' loading={isAddLoading || isUpdateLoading}>
                  {isEdit ? 'Update' : 'Add'} User
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
