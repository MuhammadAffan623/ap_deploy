import { CSSProperties, useEffect, useState } from 'react'
import { Form, Input, InputProps, theme } from 'antd'
import './style.scss'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import RevIcon from '~/components/RevIcons'

interface IProps extends InputProps {
  styleFormItem?: CSSProperties
  label?: string
  formItemClass?: string
  inputClass?: string
  inverseBg?: boolean
  handleChange?: (value: string) => void
}

const searchFieldPrefixIconStyles: CSSProperties = { fontSize: 20, marginRight: 10 }

const SearchField = ({
  value,
  label,
  name,
  suffix,
  styleFormItem,
  style,
  disabled,
  formItemClass,
  inputClass,
  handleChange,
  inverseBg = false,
  ...rest
}: IProps): ReactNode => {
  const [searchValue, setSearchValue] = useState('')
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

  useEffect(() => {
    // Define the debouncing function
    const debounceSearch = setTimeout(() => {
      handleChange && handleChange(searchValue)
    }, 300)

    // Clean up the timeout on component unmount and when searchValue changes
    return () => clearTimeout(debounceSearch)
  }, [searchValue])

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
        onChange={(e) => setSearchValue(e.target.value)}
        style={{
          color: colorTextHeading,
          border: 'none',
          ...searchInverseStyles,
          ...style
        }}
        prefix={
          <>
            <RevIcon rev='rev'>
              <SearchOutlined style={searchFieldPrefixIconStyles} />
            </RevIcon>
          </>
        }
        suffix={suffix}
        {...rest}
      />
    </Form.Item>
  )
}

export default SearchField