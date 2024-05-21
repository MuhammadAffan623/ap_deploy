import { Col, Divider, Form, Input, Row, Space, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { BasicModal, Button, SelectField, TextField, DatePicker } from '~/components'
import { PlusOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import './styles.scss'
import LibraryFileDropper from './LibraryFileDropper'
import { useGetFileMutation, useUploadFileMutation } from '~/store/services/file.services'
import {
  useCreateLibraryMutation,
  useUpdateLibraryMutation
} from '~/store/services/library.service'

interface IAddEditLibraryProps {
  open: boolean
  handleClose: (status: boolean) => void
  isEdit?: boolean
  library?: Partial<ILibrary> | null
  categories: string[]
  refetch: () => void
}

let index = 0

const AddEditLibrary = ({
  library,
  handleClose,
  open,
  isEdit = false,
  categories = [],
  refetch
}: IAddEditLibraryProps) => {
  const [items, setItems] = useState<string[]>([])
  const [name, setName] = useState('')
  const inputRef = useRef<InputRef>(null)

  const [form] = Form.useForm()
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadFile] = useUploadFileMutation()
  const [getFile] = useGetFileMutation()
  const [createLibrary] = useCreateLibraryMutation()
  const [updateLibrary] = useUpdateLibraryMutation()

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault()
    setItems([...items, name || `New item ${index++}`])
    setName('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleFormSubmit = (values: any) => {
    const body = {
      ...values,
      selectedDate: new Date(values.selectedDate).toISOString(),
      fileUrl: uploadedUrl
    }
    if (isEdit) {
      updateLibrary({ libraries: [library?._id], libraryValues: { ...body } })
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
      createLibrary(body)
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
    uploadFile({ type: 'library', folderName: 'library-form', formData })
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
            setUploadedUrl(response.data)
            form.setFieldValue('fileUrl', response.data)
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
    if (library) {
      form.setFieldsValue({
        title: library.title,
        category: library.category,
        status: library.status,
        fileUrl: library.fileUrl
      })
    } else {
      form.resetFields()
    }
  }, [library])

  useEffect(() => {
    setItems(categories)
  }, [categories])

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
      >
        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <TextField name='title' label='Title' placeholder='Enter Title' required />
          </Col>
          <Col span={24} md={12}>
            <SelectField
              name='category'
              label='Category'
              options={items?.map((item) => ({ label: item, value: item }))}
              inverseBg
              placeholder='select category'
              defaultActiveFirstOption
              formItemClass='category-select-field'
              style={{ marginTop: '3px', background: 'none' }}
              required
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Input
                      placeholder='Please enter item'
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button type='text' icon={<PlusOutlined  />} onClick={addItem}>
                      Add item
                    </Button>
                  </Space>
                </>
              )}
            />
          </Col>
          <Col span={24} md={12}>
            <TextField name='fileUrl' label='Direct URL' placeholder='Enter url' required />
          </Col>
          <Col span={24} md={12}>
            <DatePicker
              name='selectedDate'
              label=' '
              placeholder='Select Date'
              style={{ marginTop: '3px' }}
              fullWidth
              required
            />
          </Col>
          <Col span={24}>
            <Divider style={{ border: '1px solid rgba(151, 151, 151, 1)' }} />
            <div>
              <LibraryFileDropper handleUpload={handleUpload} isLoading={uploading} />
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

export default AddEditLibrary
