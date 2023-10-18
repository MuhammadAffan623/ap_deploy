import { CSSProperties, ForwardedRef, forwardRef } from 'react'
import { Form, Input, InputProps, InputRef, theme } from 'antd'
import { RuleObject } from 'antd/es/form'
import { emailRegex, passwordRegex, usernameRegex } from '~/utils/helper'

interface IProps extends InputProps {
  message?: string
  styleFormItem?: CSSProperties
  required?: boolean
  label?: string
  formItemClass?: string
  inputClass?: string
}

const TextField = forwardRef(
  (
    {
      value,
      type,
      message,
      placeholder,
      label,
      name,
      suffix,
      styleFormItem,
      style,
      disabled,
      required,
      formItemClass,
      inputClass,
      ...rest
    }: IProps,
    ref: ForwardedRef<InputRef>
  ): ReactNode => {
    const { useToken } = theme
    const { token } = useToken()

    let rules = []

    if (name === 'email' && type !== 'text') {
      rules = [
        {
          required: required ?? false,
          message: message ?? 'Please enter an email'
        },
        () => ({
          validator(_: RuleObject, val: any) {
            if (!val) {
              return Promise.resolve()
            } else if (emailRegex.test(val)) {
              return Promise.resolve()
            }
            return Promise.reject(new Error('Please enter a valid email'))
          }
        })
      ]
    } else if (name === 'confirmPassword') {
      rules = [
        {
          required: true,
          message: 'Please confirm your password'
        },
        ({ getFieldValue }: any) => ({
          validator(_: RuleObject, val: any) {
            if (!val || getFieldValue('password') === val) {
              return Promise.resolve()
            }
            return Promise.reject(new Error('The two passwords that you entered do not match'))
          }
        })
      ]
    } else if (name === 'oldPassword') {
      rules = [
        {
          required: true,
          message: 'Please enter your current password'
        },
        ({ getFieldValue }: any) => ({
          validator(_: RuleObject, val: any) {
            if (getFieldValue('old') !== val) {
              return Promise.resolve()
            }
            return Promise.reject(new Error('Old password and new password cannot be the same'))
          }
        })
      ]
    } else if (name === 'newPassword') {
      rules = [
        {
          required: true,
          message: 'Please enter a new password'
        },
        ({ getFieldValue }: any) => ({
          validator(_: RuleObject, val: any) {
            if (!val || getFieldValue('old') !== val) {
              return Promise.resolve()
            }
            return Promise.reject(new Error('Old password and new password cannot be the same'))
          }
        })
      ]
    } else if (name === 'username') {
      rules = [
        {
          required: required ?? false,
          message: message ?? 'Username is required'
        },
        () => ({
          validator(_: RuleObject, val: any) {
            if (!val) {
              return Promise.resolve()
            } else if (usernameRegex.test(val)) {
              return Promise.reject(new Error('No spaces allowed in username'))
            }
            return Promise.resolve()
          }
        })
      ]
    } else if (name === 'phoneNumber') {
      rules = [
        {
          required: required ?? false,
          message: message ?? 'Please enter your phone number'
        }
      ]
    } else if (name === 'password') {
      rules = [
        {
          required: required ?? false,
          message: message ?? 'Password is required'
        },
        () => ({
          validator(_: RuleObject, val: any) {
            if (!val) {
              return Promise.resolve()
            } else if (val.length < 8) {
              return Promise.reject(new Error('Password must be 8 characters long or more'))
            } else if (passwordRegex.test(val) === false) {
              return Promise.reject(
                new Error(
                  'Password must contain at least one uppercase, one lowercase, one number and one special character'
                )
              )
            }
            return Promise.resolve()
          }
        })
      ]
    } else {
      rules = [
        {
          required: required ?? false,
          message: message
        }
      ]
    }

    return (
      <Form.Item
        name={name}
        label={label}
        className={['formItem', formItemClass].join(' ')}
        rules={rules}
        style={{ ...styleFormItem }}
      >
        {type === 'password' ? (
          <Input.Password
            disabled={disabled}
            name={name}
            value={value}
            size='large'
            className={[inputClass].join('')}
            placeholder={placeholder}
            style={{
              color: token.colorTextHeading,
              border: 'none',
              ...style
            }}
            suffix={suffix}
            {...rest}
          />
        ) : (
          <Input
            disabled={disabled}
            type={type}
            value={value}
            name={name}
            size='large'
            ref={ref}
            className={[inputClass].join('')}
            placeholder={placeholder}
            style={{
              color: token.colorTextHeading,
              border: 'none',
              ...style
            }}
            suffix={suffix}
            {...rest}
          />
        )}
      </Form.Item>
    )
  }
)

TextField.displayName = 'TextField'

export default TextField
