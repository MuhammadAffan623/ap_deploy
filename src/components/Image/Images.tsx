import { Image, ImageProps } from 'antd'

const ImagesBox = ({ src, width, height, style, ...rest }: ImageProps): ReactNode => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      preview={false}
      alt='image'
      style={{ verticalAlign: 'text-bottom', ...style }}
      {...rest}
    />
  )
}

export default ImagesBox
