import { Button as AntButton, ButtonProps, theme } from 'antd'
import './style.scss'

const Button = ({ children, style, ...rest }: ButtonProps): ReactNode => {
  const { useToken } = theme
  const {
    token: { borderRadius, fontWeightStrong }
  } = useToken()

  return (
    <AntButton
      size='large'
      style={{
        borderRadius: borderRadius,
        fontWeight: fontWeightStrong,
        ...style
      }}
      {...rest}
    >
      {children}
    </AntButton>
  )
}

export default Button
