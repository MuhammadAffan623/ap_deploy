import { Form, Radio, RadioGroupProps, Space } from 'antd'
import { CSSProperties } from 'react'

interface IProps extends RadioGroupProps {
  label: string
  children: ReactNode | ReactNode[]
  message?: string
  required?: boolean
  styleFormItem?: CSSProperties
}

const RadioField = ({ label, name, required, message, styleFormItem, children }: IProps) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: required, message: message }]}
      className='formItem'
      style={styleFormItem}
    >
      <Radio.Group>
        <Space direction='vertical'>{children}</Space>
      </Radio.Group>
    </Form.Item>
  )
}

export default RadioField
