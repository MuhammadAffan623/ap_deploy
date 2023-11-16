import { Col, Divider, Form, Row } from 'antd'
import { useEffect } from 'react'
import { BasicModal, Button, SelectField, TextField, DatePicker } from '~/components'
import './styles.scss'
import LibraryFileDropper from './LibraryFileDropper'

interface IAddEditLibraryProps {
  open: boolean
  handleClose: (status: boolean) => void
  isEdit?: boolean
  library?: Partial<ILibrary>
}

const AddEditLibrary = ({ library, handleClose, open, isEdit = false }: IAddEditLibraryProps) => {
  const [form] = Form.useForm()

  const handleFormSubmit = (values: any) => {
    if (isEdit) {
      console.log(values, 'isEdit')
    } else {
      console.log(values)
    }
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
              style={{ border: 'none', width: '100%' }}
            />
          </Col>
          <Col span={24} md={12}>
            <TextField name='url' label='Direct URL' placeholder='Enter url' required />
          </Col>
          <Col span={24} md={12}>
            <DatePicker name='date' label=' ' placeholder='Select Date' required />
          </Col>
          <Col span={24}>
            <Divider style={{ border: '1px solid rgba(151, 151, 151, 1)' }} />
            <div>
              <LibraryFileDropper />
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
