import { Col, Divider, Form, Row, message } from 'antd'
import { useEffect, useState } from 'react'
import { BasicModal, Button, SelectField, TextField } from '~/components'

import './styles.scss'
import { useGetFileMutation, useUploadFileMutation } from '~/store/services/file.services'
import { useCreateFormMutation, useUpdateFormMutation } from '~/store/services/form.service'
import FileDropper from '~/pages/FormsHub/Forms/AddEditForm/FileDropper'

interface IAddEditLibraryProps {
  open: boolean
  handleClose: (status: boolean) => void
  formSubmitHandler : (status: boolean) => void
}

const FileUploadModal = ({ handleClose, open, formSubmitHandler }: IAddEditLibraryProps) => {
  const [form] = Form.useForm()
  const [uploadedUrl, setUploadedUrl] = useState<any>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadFile] = useUploadFileMutation()
  const [getFile] = useGetFileMutation()
  const [createForm] = useCreateFormMutation()
  const [updateForm] = useUpdateFormMutation()

  const handleFormSubmit = (values: any) => {
    
    console.log('handleFormSubmit', {values})

  }

  const handleUpload = (formData: FormData) => {
    console.log('handleUpload >> ', { formData })
    // setUploading(true)
    // message.info('Please wait, file is being uploaded')
    // uploadFile({ type: 'form', folderName: 'template-form', formData })
    //   .unwrap()
    //   .then((res: any) => {
    //     console.log('uploadFile >> ',{res})
    //     const params = {
    //       key: res.data.uploadedFile.key,
    //       versionId: res.data.uploadedFile.s3VersionId
    //     }
    //     const dummyObj = {
    //       _id: res?.data?.file?._id,
    //       versions: [res?.data?.uploadedFile]
    //     }
    //     getFile(params)
    //       .unwrap()
    //       .then((dd) => {
    //         console.log('getFile >> ',{dd})
    //         setUploading(false)
    //         setUploadedUrl(dummyObj)
    //         form.setFieldValue('file', res.data.file._id)
    //         message.success('File uploaded successfully')
    //       })
    //       .catch((error: any) => {
    //         setUploading(false)
    //         message.error(error?.data?.error)
    //       })
    //   })
    //   .catch((err: any) => {
    //     setUploading(false)
    //     message.error(err?.data?.error)
    //   })
  }
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
        <Row>
          <Col className={'input_css'} span={24}>
            <TextField name='name' label='Name*' placeholder='Enter Name' required />
          </Col>
          <Col span={24} className={'input_css'}>
            <TextField name='owner' label='Owner*' placeholder='Enter Owner Name' required />
          </Col>

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
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </BasicModal>
  )
}

export default FileUploadModal
