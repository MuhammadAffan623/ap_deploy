import React, { CSSProperties } from 'react'
import { Form, Input } from 'antd'
import { TextAreaProps } from 'antd/es/input'

interface IProps extends TextAreaProps {
  value?: string
  message?: string
  placeholder?: string
  label?: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  row?: number
  styleFormItem?: CSSProperties
  formItemClass?: string
}

const { TextArea: AntTextArea } = Input
const TextArea = ({
  value,
  onChange,
  message,
  placeholder,
  label,
  name,
  row,
  className,
  styleFormItem,
  formItemClass,
  required = false,
  style,
  ...rest
}: IProps): ReactNode => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: message, max: 1000 }]}
      className={['formItem', formItemClass].join(' ')}
      style={styleFormItem}
    >
      <AntTextArea
        rows={row || 4}
        value={value}
        name={name}
        size='large'
        placeholder={placeholder}
        style={{ ...style }}
        onChange={onChange}
        className={className}
        {...rest}
      />
    </Form.Item>
  )
}

export default TextArea
