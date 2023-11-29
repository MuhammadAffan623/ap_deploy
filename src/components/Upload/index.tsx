import React, { useRef, useState } from 'react'
import { Tag, Typography } from 'antd'
import './style.scss'
import Dragger from '../Dragger'

interface IUploadProps {
  onFileSelected: (url: string) => void
  children: ReactNode
  title: string
  paragraph: string
}

const Upload = ({ onFileSelected, children, title, paragraph }: IUploadProps) => {
  const [fileList, setFileList] = useState([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleUpload = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (fileInputRef?.current) {
      fileInputRef.current.click()
    }
  }
  const handleFileChange = (info: any) => {
    let fileList = [...info.fileList]
    fileList = fileList?.slice(-3)
    setFileList(fileList as any)
  }
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]
    if (file) {
      const objectUrlLocal = URL.createObjectURL(file)

      onFileSelected(objectUrlLocal)
    }
  }
  return (
    <div className='border-style'>
      <Dragger fileList={fileList} onChange={handleFileChange}>
        <Typography.Title level={3} className='Title'>
          {title}
        </Typography.Title>
        <input
          type='file'
          onChange={changeHandler}
          ref={fileInputRef}
          style={{ visibility: 'hidden', width: 0, height: 0 }}
        />
        <button type='button' onClick={handleUpload} className='button-upload'>
          {children}
        </button>
        <Tag className='Upload'>Upload</Tag>
        <Typography.Title level={3} className='Title1'>
          {paragraph}
        </Typography.Title>
      </Dragger>
    </div>
  )
}
export default Upload
