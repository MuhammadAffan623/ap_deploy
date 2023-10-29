import { Select as AntSelect, Form, SelectProps, Tag, theme } from 'antd'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'
import './style.scss'
import { CSSProperties } from 'react'

type IProps = {
  message?: string
  name?: string
  label?: string
  required?: boolean
  styleFormItem?: CSSProperties
  formItemClass?: string
  inverseBg?: boolean
} & SelectProps

const tagRender = (props: CustomTagProps) => {
  const { label, closable, onClose } = props

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <>
      <Tag
        color='green'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, fontSize: 14, padding: '6px' }}
      >
        {label}
      </Tag>
    </>
  )
}

const SelectField = ({
  options,
  placeholder,
  defaultValue,
  formItemClass = '',
  styleFormItem,
  name,
  disabled,
  label,
  message,
  inverseBg = false,
  required = false,
  style,
  ...rest
}: IProps): ReactNode => {
  const { useToken } = theme
  const {
    token: { colorBgLayout }
  } = useToken()

  let searchInverseStyles: CSSProperties = {
    backgroundColor: colorBgLayout
  }

  if (!inverseBg) {
    searchInverseStyles = {}
  }
  return (
    <Form.Item
      label={label}
      className={['formItem', formItemClass].join(' ')}
      name={name}
      rules={[{ required: required, message: message ?? 'Please select a value from list' }]}
      style={{ ...styleFormItem }}
    >
      <AntSelect
        defaultValue={defaultValue}
        size='large'
        placeholder={placeholder}
        options={options}
        tagRender={tagRender}
        disabled={disabled}
        style={{
          ...searchInverseStyles,
          ...style
        }}
        {...rest}
      />
    </Form.Item>
  )
}

export default SelectField
