import { CSSProperties } from 'react'
import { Form, Input, InputProps, theme } from 'antd'
import './style.scss'
import SearchOutlined from '@ant-design/icons/SearchOutlined'

interface IProps extends InputProps {
  styleFormItem?: CSSProperties
  label?: string
  formItemClass?: string
  inputClass?: string
  inverseBg?: boolean
}

const searchFieldPrefixIconStyles: CSSProperties = { fontSize: 20, marginRight: 10 }

const SearchField = ({
  value,
  placeholder,
  label,
  name,
  suffix,
  styleFormItem,
  style,
  disabled,
  formItemClass,
  inputClass,
  inverseBg = false,
  ...rest
}: IProps): ReactNode => {
  const { useToken } = theme
  const {
    token: { colorTextHeading, colorBgLayout }
  } = useToken()

  let searchInverseStyles: CSSProperties = {
    backgroundColor: colorBgLayout
  }

  if (!inverseBg) {
    searchInverseStyles = {}
  }

  return (
    <Form.Item
      name={name}
      label={label}
      className={['formItem', formItemClass].join(' ')}
      style={{ ...styleFormItem }}
    >
      <Input
        disabled={disabled}
        type='text'
        value={value}
        name={name}
        size='large'
        className={[inputClass].join(' ')}
        placeholder={placeholder}
        style={{
          color: colorTextHeading,
          border: 'none',
          ...searchInverseStyles,
          ...style
        }}
        prefix={<SearchOutlined rev='rev' style={searchFieldPrefixIconStyles} />}
        suffix={suffix}
        {...rest}
      />
    </Form.Item>
  )
}

export default SearchField