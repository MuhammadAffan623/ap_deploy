import { Col, Form, Row, Skeleton, Typography, message, theme } from 'antd'
import { CSSProperties, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa"
import editIcon from '~/assets/icons/edit.svg'
import {
  Avatar,
  BasicModal,
  Button,
  ImagesBox,
  TextArea,
  TextField
} from '~/components'
import {
  useCreateUserByIdMutation,
  useUpdateUserByIdMutation
} from '~/store/services/contact.services'
import { useGetFileMutation, useUploadFileMutation } from '~/store/services/file.services'
import './styles.scss'
import { IconType } from 'react-icons'


interface IAddEditContactProps {
  open: boolean
  handleClose: () => void
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
  const [uploadFile]: any = useUploadFileMutation()
  const [getFile]: any = useGetFileMutation()
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | IconType |null>('')
  const [uploading, setUploading] = useState<boolean>(false)
  const {
    token: { colorTextTertiary }
  } = useToken()

  const handleFormSubmit = (body: any) => {
    const newObj = {
      ...body,
      phone:  body.phone,
      avatar: uploadedImgUrl ?? contact?.avatar ?? ''
    }



    if (isEdit) {
      updateUserById({
        id: contact?._id,
        body: newObj
      })
        .unwrap()
        .then((res) => {
          message.success(res?.data?.message ?? 'Contact updated successfully')
          handleClose()
        })
        .catch((err) => {
          message.error(err?.data?.error ?? 'Something went wrong')
        })
    } else {
      createUserById({ ...newObj, phone:  body.phone })
        .unwrap()
        .then((res) => {
          message?.success(res?.data?.message ?? 'Contact created successfully')
          handleClose()
        })
        .catch((err) => {
          message.error(err?.data?.error ?? 'Something went wrong')
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

  const [updateUserById, { isLoading: updateUserLoading }] = useUpdateUserByIdMutation()
  const [createUserById, { isLoading: createUserLoading }] = useCreateUserByIdMutation()

  useEffect(() => {
    if (!open) {
      form.resetFields()
      setUploadedImgUrl('')
      return
    }

    form.setFieldsValue({
      name: contact?.name ?? '',
      email: contact?.email,
      phone: contact?.phone,
      role: contact?.role,
      address: contact?.address,
      jobTitle: contact?.jobTitle,
      division: contact?.division,
      notes: contact?.notes,
      avatar: contact?.avatar ?? ''
    })
    setUploadedImgUrl(contact?.avatar ?? null)
  }, [contact, open])

  return (
    <BasicModal
      open={open}
      onCancel={() => {
        handleClose()
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
          <Col span={24}>
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
                    src={(uploadedImgUrl as string) ?? <FaPlus/>}
                    name=''
                    shape='square'
                    style={getAvatarContainerStyle(colorTextTertiary)}
                    rootClassName='profile-avatar'
                  />
                </>
              )}
            </div>
          </Col>

          <Col span={12}>
            <TextField name='name' label='Full Name *' placeholder='Enter full name' required />
          </Col>

          <Col span={12}>
            <TextField name='email' label='Email *' placeholder='Enter email' required />
          </Col>
          <Col span={24}>
            <Col span={24}>
              <Typography.Text style={{ color: colorTextTertiary }}>Phone *</Typography.Text>
            </Col>
            <Row className='phone-number-combined-field'>
              {/* <SelectField
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
              /> */}
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
            <TextField name='division' label='Division *' placeholder='Division' />
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
