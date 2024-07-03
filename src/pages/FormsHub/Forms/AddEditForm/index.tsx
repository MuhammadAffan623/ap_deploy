import { Col, Divider, Form, Row, message } from 'antd'
import { useEffect, useState } from 'react'
import { BasicModal, Button, SelectField, TextField } from '~/components'

import './styles.scss'
import FileDropper from './FileDropper'
import { useGetFileMutation, useUploadFileMutation } from '~/store/services/file.services'
import { useCreateFormMutation, useUpdateFormMutation } from '~/store/services/form.service'

interface IAddEditLibraryProps {
  open: boolean
  handleClose: (status: boolean) => void
  isEdit?: boolean
  editItem?: Partial<IForm> | null
  refetch: () => void
}

const AddEditForm = ({
  editItem,
  handleClose,
  open,
  isEdit = false,
  refetch
}: IAddEditLibraryProps) => {
  const [form] = Form.useForm()
  const [uploadedUrl, setUploadedUrl] = useState<any>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadFile] = useUploadFileMutation()
  const [getFile] = useGetFileMutation()
  const [createForm] = useCreateFormMutation()
  const [updateForm] = useUpdateFormMutation()

  const handleFormSubmit = (values: any) => {
    const body = {
      ...values,
      file: uploadedUrl?._id
    }
    if (isEdit) {
      updateForm({ id: editItem?._id, ...body })
        .unwrap()
        .then((res: any) => {
          message.success(res?.message)
          handleClose(false)
          refetch()
          form.resetFields()
        })
        .catch((err: any) => {
          message.error(err?.data?.error)
        })
    } else {
      createForm(body)
        .unwrap()
        .then((res) => {
          handleClose(false)
          refetch()
          form.resetFields()
          message.success(res.message)
        })
        .catch((err) => {
          message.error(err?.data?.error)
        })
    }
  }

  const handleUpload = (formData: FormData) => {
    setUploading(true)
    message.info('Please wait, file is being uploaded')
    uploadFile({ type: 'form', folderName: 'template-form', formData })
      .unwrap()
      .then((res: any) => {
        const params = {
          key: res.data.uploadedFile.key,
          versionId: res.data.uploadedFile.s3VersionId
        }
        const dummyObj = {
          _id: res?.data?.file?._id,
          versions: [res?.data?.uploadedFile]
        }
        getFile(params)
          .unwrap()
          .then(() => {
            setUploading(false)
            setUploadedUrl(dummyObj)
            form.setFieldValue('file', res.data.file._id)
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
    if (editItem) {
      form.setFieldsValue({
        name: editItem.name,
        owner: editItem.owner,
        status: editItem.status
      })
      setUploadedUrl(editItem.file)
    } else {
      form.resetFields()
      setUploadedUrl(null)
    }
  }, [editItem])

  return (
    <BasicModal
      open={open}
      width={800}
      onCancel={() => {
        handleClose(false)
      }}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFormSubmit}
        className='add-edit-library-form'
        initialValues={{ name: '', owner: '', status: '', file: '' }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <TextField name='name' label='Name*' placeholder='Enter Name' required />
          </Col>
          <Col
            span={24}
            style={{
              height: '67px'
            }}
          >
            <TextField name='owner' label='Owner*' placeholder='Enter Owner Name' required />
          </Col>

          {editItem && (
            <Col span={24} md={12}>
              <SelectField
                name='status'
                label='Status'
                required
                options={[
                  { label: 'Draft', value: 'Draft' },
                  { label: 'Completed', value: 'Completed' }
                ]}
              />
            </Col>
          )}

          <Col span={24}>
            <Divider style={{ border: '1px solid rgba(151, 151, 151, 1)' }} />
            <div>
              <FileDropper
                uploadedUrl={uploadedUrl}
                setUploadedUrl={setUploadedUrl}
                handleUpload={handleUpload}
                isLoading={uploading}
              />
            </div>
          </Col>

          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type='primary' htmlType='submit'>
              {isEdit ? 'Update' : 'Save'}
            </Button>
          </Col>
        </Row>
      </Form>
    </BasicModal>
  )
}

export default AddEditForm
