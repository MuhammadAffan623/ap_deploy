import { Col, Divider, Form, Row } from 'antd'
import { useEffect } from 'react'
import { BasicModal, Button, SelectField, TextField, DatePicker } from '~/components'
import './styles.scss'
import FileDropper from './FileDropper'

interface IAddEditFormProps {
  open: boolean
  handleClose: (status?: boolean) => void
  isEdit?: boolean
  library?: Partial<ILibrary>
}

const AddEditForm = ({ library, handleClose, open, isEdit = false }: IAddEditFormProps) => {
  const [form] = Form.useForm()

  const handleFormSubmit = (values: any) => {
    if (isEdit) {
      console.log(values, 'isEdit')
    } else {
      console.log(values)
    }
    handleClose()
  }

  useEffect(() => {
    if (library)
      form.setFieldsValue({
        title: library.title,
        category: library.category,
        status: library.status,
        url: library.url,
        file: library.file
      })
  }, [library])

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
              options={[
                { label: 'Humana', value: 'humana' },
                { label: 'Humana1', value: 'humana1' }
              ]}
              inverseBg
              placeholder='category'
              defaultActiveFirstOption
              formItemClass='category-select-field'
              style={{ marginTop: '3px', background: 'none' }}
            />
          </Col>
          <Col span={24} md={12}>
            <TextField name='url' label='Direct URL' placeholder='Enter url' required />
          </Col>
          <Col span={24} md={12}>
            <DatePicker
              name='date'
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
              <FileDropper />
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
