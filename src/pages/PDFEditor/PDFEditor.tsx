import WebViewer from '@pdftron/webviewer'
import React, { useEffect, useRef, useState } from 'react'

const PDFEditor = () => {
  const viewer = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const pathToFiles = '/webviewer/lib'
  const filePath = new URLSearchParams(window.location.search).get('file') ?? ''
  useEffect(() => {
    setLoading(true)
    WebViewer(
      {
        path: pathToFiles,
        initialDoc: filePath,
        enableFilePicker: true,
        backendType: 'asm',
        notesInLeftPanel: true
      },
      viewer.current as HTMLElement
    ).then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {loading && (
        <div style={{ fontSize: '30px' }} className='loading'>
          Loading...
        </div>
      )}
      <div className='webviewer' style={{ height: '100vh' }} ref={viewer as any}></div>
    </div>
  )
}

export default PDFEditor
