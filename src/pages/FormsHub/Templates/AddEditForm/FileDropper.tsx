import { type UploadProps } from 'antd'
import { Button, Dragger } from '~/components'
import { FaCloudUploadAlt } from 'react-icons/fa'

const FileDropper = ({
  handleUpload,
  isLoading
}: {
  handleUpload: any
  isLoading: boolean
}) => {
  const props: UploadProps = {
    name: 'file',
    listType: 'picture',
    multiple: false,
    showUploadList: false,

    customRequest(e: any) {
      const file = e.file

      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        handleUpload(formData)
      }
    },

    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }
  return (
    <Dragger {...props}>
      <p className='ant-upload-text'>Embed Attachment in Page</p>
      <p className='ant-upload-drag-icon'>
        <FaCloudUploadAlt size={100} color='rgba(165, 161, 161, 1)' />
      </p>
      <p className='ant-upload-hint'>
        Drag and Drop <br /> Or
      </p>
      <Button type='primary' danger loading={isLoading}>
        Upload
      </Button>
    </Dragger>
  )
}

export default FileDropper
