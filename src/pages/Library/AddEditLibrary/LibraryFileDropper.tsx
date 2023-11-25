import React from 'react'
import type { UploadProps } from 'antd'
import { message } from 'antd'
import { Button, Dragger } from '~/components'
import { FaCloudUploadAlt } from 'react-icons/fa'

const props: UploadProps = {
  name: 'file',
  listType: 'picture',
  multiple: true,
  customRequest(e: any) {
    console.log('eeeee', e)
  },
  // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  // onChange(info) {
  //   const { status } = info.file
  //   if (status !== 'uploading') {
  //     console.log(info.file, info.fileList)
  //   }
  //   // console.log('status', info)

  //   if (status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully.`)
  //   } else if (status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`)
  //   }
  // },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  }
}

const LibraryFileDropper: React.FC = () => (
  <Dragger {...props}>
    <p className='ant-upload-text'>Embed Attachment in Page</p>
    <p className='ant-upload-drag-icon'>
      <FaCloudUploadAlt size={100} color='rgba(165, 161, 161, 1)' />
    </p>
    <p className='ant-upload-hint'>
      Drag and Drop <br /> Or
    </p>
    <Button type='primary' danger>
      Upload
    </Button>
  </Dragger>
)

export default LibraryFileDropper
