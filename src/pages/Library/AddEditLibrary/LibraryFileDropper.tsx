/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { type UploadProps } from 'antd'
import { Button, Dragger } from '~/components'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const LibraryFileDropper = ({
  handleUpload,
  isLoading,  uploadedUrl,
  setUploadedUrl
}: {
  handleUpload: any
  isLoading: boolean
  uploadedUrl: any
  setUploadedUrl: any
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
    <Dragger 
    accept='"application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
    text/plain, application/pdf'
    
    {...props}>
      <p className='ant-upload-text'>Embed Attachment in Page</p>
      <p className='ant-upload-drag-icon'>
        <FaCloudUploadAlt size={100} color='rgba(165, 161, 161, 1)' />
      </p>
      {uploadedUrl?.versions?.length > 0 && (
        <div>
          <span>{uploadedUrl?.versions?.[0]?.key}</span>
          <span
            onClick={(e) => {
              e.stopPropagation()

              setUploadedUrl(null)
            }}
          >
            <MdDelete />
          </span>
        </div>
      )}
      <p className='ant-upload-hint'>
        Drag and Drop <br /> Or
      </p>
      <Button type='primary' danger loading={isLoading}>
        Upload
      </Button>
    </Dragger>
  )
}

export default LibraryFileDropper
