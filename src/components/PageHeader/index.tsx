import { Space, Typography } from 'antd'
import Button from '../Button/'
import './style.scss'
import SelectField from '../Inputs/SelectField/'
import { PlusOutlined } from '@ant-design/icons'

interface IProps {
  title?: string
  showSelect?: boolean
  buttonText?: string
  btnLoader?: boolean
  selectValue?: string
  options?: IOption[]
  onButtonClick?: () => void
  onSelectChange?: (value: string) => void
}

const PageHeader = ({
  title,
  showSelect,
  buttonText,
  btnLoader,
  options,
  onButtonClick,
  onSelectChange,
  selectValue
}: IProps): ReactNode => {
  return (
    <div className='wrapper'>
      {title && (
        <Typography.Title level={1} style={{ fontWeight: 500 }}>
          {title}
        </Typography.Title>
      )}

      <Space>
        {showSelect && (
          <div className='select-box'>
            <SelectField
              options={options}
              bordered={false}
              value={selectValue}
              onChange={onSelectChange}
              className='select-wrapper'
            />
          </div>
        )}
        {buttonText && (
          <Button
            type='primary'
            size='large'
            icon={<PlusOutlined rev={false} />}
            onClick={onButtonClick}
            className='btn'
            disabled={btnLoader}
          >
            {buttonText}
          </Button>
        )}
      </Space>
    </div>
  )
}

export default PageHeader
