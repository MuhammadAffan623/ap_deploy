import { CSSProperties, forwardRef } from 'react'
import { ColProps, Form, DatePicker as AntDatePicker, DatePickerProps, theme } from 'antd'

type IProps = {
  message?: string
  styleFormItem?: CSSProperties
  required?: boolean
  label?: string
  value?: any
  formItemClass?: string
  inputClass?: string
  fullWidth?: boolean
  labelCol?: ColProps
} & DatePickerProps

const DatePicker = forwardRef(
  ({
    value,
    message,
    placeholder,
    label,
    name,
    styleFormItem,
    fullWidth,
    style,
    disabled,
    required,
    formItemClass,
    inputClass,
    labelCol,
    ...rest
  }: IProps): ReactNode => {
    const { useToken } = theme
    const { token } = useToken()

    const rules = [
      {
        required: required ?? false,
        message: message ?? 'Date is Required'
      }
    ]

    return (
      <Form.Item
        name={name}
        label={label}
        className={['formItem', formItemClass].join(' ')}
        rules={rules}
        labelCol={labelCol}
        style={{ ...styleFormItem }}
      >
        <AntDatePicker
          disabled={disabled}
          value={value}
          name={name}
          size='large'
          className={[inputClass].join('')}
          placeholder={placeholder}
          style={{
            color: token.colorTextHeading,
            ...(fullWidth && { width: '100%' }),
            ...style
          }}
          {...rest}
        />
      </Form.Item>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export default DatePicker
