import { CSSProperties, ForwardedRef, forwardRef } from 'react'
import { ColProps, Form, Input, InputProps, InputRef, theme } from 'antd'
import { getRules } from '~/utils/helper'
import { SizeType } from 'antd/es/config-provider/SizeContext'

interface IProps extends InputProps {
  message?: string
  styleFormItem?: CSSProperties
  required?: boolean
  label?: string
  formItemClass?: string
  inputClass?: string
  labelCol?: ColProps
}

const TextField = forwardRef(
  (
    {
      type = 'text',
      message,
      placeholder,
      label,
      name = '',
      suffix,
      styleFormItem,
      style,
      disabled,
      required,
      formItemClass,
      inputClass,
      labelCol,
      ...rest
    }: IProps,
    ref: ForwardedRef<InputRef>
  ): ReactNode => {
    const { useToken } = theme
    const { token } = useToken()

    const rules = getRules(name, type, required, message)

    const commonInputProps = {
      disabled,
      name,
      size: 'large' as SizeType,
      className: [inputClass].join(''),
      placeholder,
      style: {
        color: token.colorTextHeading,
        ...style
      },
      suffix,
      ref,
      ...rest
    }

    return (
      <Form.Item
        name={name}
        label={label}
        className={`formItem ${formItemClass}`}
        rules={rules}
        labelCol={labelCol}
        style={{ ...styleFormItem }}
      >
        {type === 'password' ? (
          <Input.Password {...commonInputProps} />
        ) : (
          <Input type={type} {...commonInputProps} />
        )}
      </Form.Item>
    )
  }
)

TextField.displayName = 'TextField'

export default TextField
