import { Col, Divider, Form, Input, Row, Space, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { BasicModal, Button, GoogleAutocomplete, SelectField, TextField } from '~/components'
import { PlusOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import './styles.scss'
import LibraryFileDropper from './LibraryFileDropper'
import { useGetFileMutation, useUploadFileMutation } from '~/store/services/file.services'
import {
  useCreateProjectMutation,
  useUpdateProjectMutation
} from '~/store/services/project.service'

interface IAddEditLibraryProps {
  open: boolean
  handleClose: (status: boolean) => void
  isEdit?: boolean
  editItem?: Partial<IBlueForm> | null
  refetch: () => void
}

let index = 0

const AddEditProject = ({
  editItem,
  handleClose,
  open,
  isEdit = false,
  refetch
}: IAddEditLibraryProps) => {
  const [items, setItems] = useState<string[]>([])
  const [name, setName] = useState('')
  const inputRef = useRef<InputRef>(null)

  const [form] = Form.useForm()
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [address, setAddress] = useState<any>(null)
  const [resetKey, setResetKey] = useState<boolean>(false)
  const [uploadFile] = useUploadFileMutation()
  const [getFile] = useGetFileMutation()
  const [createProject] = useCreateProjectMutation()
  const [updateProject] = useUpdateProjectMutation()

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
    if (!uploadedUrl) {
      message.error('Please upload a file before submitting')
      return
    }

    const body = {
      ...values,
      sheets: [uploadedUrl],
      address: address?.formatted_address,
      latitude: `${address?.geometry?.location?.lat()}`,
      longitude: `${address?.geometry?.location?.lng()}`
    }
    if (isEdit) {
      updateProject({ id: editItem?._id, ...body })
        .unwrap()
        .then((res: any) => {
          message.success(res?.message)
          handleClose(false)
          refetch()
          form.resetFields()
          setAddress(null)
          setResetKey((prevKey) => !prevKey)
        })
        .catch((err: any) => {
          message.error(err?.data?.error)
        })
    } else {
      createProject(body)
        .unwrap()
        .then((res) => {
          handleClose(false)
          refetch()
          form.resetFields()
          setAddress(null)
          setResetKey((prevKey) => !prevKey)
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
    uploadFile({ type: 'project', folderName: 'project-sheet', formData })
      .unwrap()
      .then((res: any) => {
        const params = {
          key: res.data.uploadedFile.key,
          versionId: res.data.uploadedFile.s3VersionId
        }
        getFile(params)
          .unwrap()
          .then(() => {
            setUploading(false)
            setUploadedUrl(res.data.file._id)
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
        tag: editItem.tag,
        status: editItem.status,
        address: editItem.address
      })
      setUploadedUrl(editItem.sheets[0]?._id)
    } else {
      form.resetFields()
      setUploadedUrl(null)
    }
  }, [editItem])

  useEffect(() => {
    setItems(['Project Tag', 'JAX', 'ORL', 'WBP'])
  }, [])

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
            <TextField
              name='name'
              label='Project Name *'
              placeholder='Enter Project Name'
              required
            />
          </Col>
          <Col span={24} md={12}>
            <SelectField
              name='tag'
              label='Tag *'
              options={items?.map((item) => ({ label: item, value: item }))}
              inverseBg
              placeholder='select tag'
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
                    <Button type='text' icon={<PlusOutlined rev={false} />} onClick={addItem}>
                      Add item
                    </Button>
                  </Space>
                </>
              )}
            />
          </Col>

          {/* <Col span={24} md={12}>
            <TextField name='address' label='Address' placeholder='Enter address' />
          </Col> */}

          <Col span={24} md={12}>
            <div style={{ color: '#8492a6', padding: '8px' }}>Address</div>
            <GoogleAutocomplete
              handlePlaceSelect={(place) => setAddress(place)}
              resetKey={resetKey}
            />
          </Col>

          {editItem && (
            <Col span={24} md={12}>
              <SelectField
                name='status'
                label='Status'
                required
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Completed', value: 'completed' },
                  { label: 'Archived', value: 'archived' }
                ]}
              />
            </Col>
          )}

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

export default AddEditProject
