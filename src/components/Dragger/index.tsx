import { Upload } from 'antd'
import type { UploadProps } from 'antd'
const { Dragger: AntDragger } = Upload

const Dragger = ({ children, ...rest }: UploadProps) => {
  return <AntDragger {...rest}>{children}</AntDragger>
}

export default Dragger
