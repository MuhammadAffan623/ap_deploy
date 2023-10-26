import { CSSProperties } from 'react'
import { Card as AntCard, CardProps as AntCardProps } from 'antd'

interface ICardProps extends AntCardProps {
  children: ReactNode
  cardClassName?: string
}

const defaultBodyStyles: CSSProperties = {
  padding: ''
}

const Card = ({ children, bodyStyle, bordered = false, ...rest }: ICardProps) => {
  return (
    <AntCard
      className='antCardComponent'
      bordered={bordered}
      bodyStyle={{ ...defaultBodyStyles, ...bodyStyle }}
      {...rest}
    >
      {children}
    </AntCard>
  )
}

export default Card
