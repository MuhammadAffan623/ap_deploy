import { Col, Form, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Avatar, BasicModal, Button, TextField } from '~/components'
import './styles.scss'
import { CloudUploadOutlined } from '@ant-design/icons'
import Upload from '~/components/Upload'

interface IAddProjectProps {
  open: boolean
  handleClose: (status: boolean) => void
  isEdit?: boolean
  contact: Partial<IProject>
}

const AddProject = ({ contact, handleClose, open, isEdit = false }: IAddProjectProps) => {
  const [form] = Form.useForm()
  //   const { useToken } = theme
  const [avatarUrl, setAvatarUrl] = useState('')

  const handleFormSubmit = (values: any) => {
    if (isEdit) {
      console.log(values)
    } else {
      console.log(values)
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      projectName: contact.name?.split(' ')[0],
      projectAddress: contact.address?.split(' ')[1]
    })
  }, [contact])

  return (
    <BasicModal
      open={open}
      onCancel={() => {
        handleClose(false)
      }}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFormSubmit}
        className='add-edit-contact-form'
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <TextField
              name='project name'
              label='Enter Project Name'
              placeholder='2103 Sunbridge'
              required
            />
          </Col>
          <Col span={24}>
            <TextField
              name='project address'
              label=' Enter Project Address'
              placeholder='123 Anytown St, Saint Cloud FL 32847'
              required
            />
          </Col>
        </Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Upload
            onFileSelected={(url) => {
              setAvatarUrl(url)
            }}
            title='Upload Your Plans'
            paragraph='Drag and Drop Or'
          >
            {avatarUrl ? <Avatar src={avatarUrl} /> : <CloudUploadOutlined rev={undefined} />}
          </Upload>
        </Col>
      </Form>
      <Typography.Title level={3} className='Text'>
        Best Quality to Upload Your Brand for PDF'S Multipage PDF'S are also supported and will
        automatically name and hyperlink them
      </Typography.Title>
      <Button type='primary' className='save-button'>
        Save
      </Button>
    </BasicModal>
  )
}

export default AddProject
