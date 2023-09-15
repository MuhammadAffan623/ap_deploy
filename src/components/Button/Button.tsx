import { Button as AntButton, ButtonProps, theme } from 'antd'

const Button = ({ children, style, ...rest }: ButtonProps): ReactNode => {
  const { useToken } = theme
  const {
    token: { borderRadius, controlHeightLG }
  } = useToken()
  return (
    <AntButton
      size='large'
      style={{
        borderRadius: borderRadius,
        height: controlHeightLG,
        ...style
      }}
      {...rest}
    >
      {children}
    </AntButton>
  )
}

export default Button
