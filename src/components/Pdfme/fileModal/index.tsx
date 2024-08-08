import { Col, Form, Row } from 'antd'
import { BasicModal, Button, TextField } from '~/components'
import './styles.scss'


interface IAddEditLibraryProps {
  open: boolean
  handleClose: (status: boolean) => void
  formSubmitHandler : (values: any) => void
}

const FileUploadModal = ({ handleClose, open, formSubmitHandler }: IAddEditLibraryProps) => {
  const [form] = Form.useForm()


  const handleFormSubmit = (values: any) => {
    console.log('handleFormSubmit', {values})
    formSubmitHandler(values)
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
        initialValues={{ name: '' }}
      >
        <Row>
          <Col className={'input_css'} span={24}>
            <TextField name='name' label='Form Name*' placeholder='Enter Form Name' required />
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
