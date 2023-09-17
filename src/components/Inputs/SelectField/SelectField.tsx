import { Select as AntSelect, Form, SelectProps, theme } from 'antd'
import './SelectField.scss'
import { CSSProperties } from 'react'

type IProps = {
  message?: string
  name?: string
  label?: string
  required?: boolean
  styleFormItem?: CSSProperties
} & SelectProps

const SelectField = ({
  options,
  placeholder,
  defaultValue,
  styleFormItem,
  name,
  disabled,
  label,
  message,
  required = false,
  style,
  ...rest
}: IProps): ReactNode => {
  const { useToken } = theme
  const { token } = useToken()
  return (
    <Form.Item
      label={label}
      className='formItem'
      name={name}
      rules={[{ required: required, message: message ?? 'Please select a value from list' }]}
      style={{ ...styleFormItem }}
    >
      <AntSelect
        defaultValue={defaultValue}
        size='large'
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        style={{
          borderRadius: token.borderRadiusXS,
          border: 'none',
          ...style
        }}
        {...rest}
      />
    </Form.Item>
  )
}

export default SelectField
