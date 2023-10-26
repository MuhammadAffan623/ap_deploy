import { Tag, TagProps } from 'antd'
import './styles.scss'

const IconTag = ({ bordered = false, className, ...rest }: TagProps) => {
  return (
    <Tag
      bordered={bordered}
      className={['customIconIndicatorTag', className].join(' ')}
      {...rest}
    />
  )
}

export default IconTag
