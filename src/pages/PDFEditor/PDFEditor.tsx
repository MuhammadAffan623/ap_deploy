import WebViewer from '@pdftron/webviewer'
import React, { useEffect, useRef, useState } from 'react'

const PDFEditor = () => {
  const viewer = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [downloadLink, setDownloadLink] = useState<any>('')
  const pathToFiles = '/webviewer/lib'
  const filePath = new URLSearchParams(window.location.search).get('file') ?? ''
  useEffect(() => {
    setLoading(true)
    WebViewer(
      {
        path: pathToFiles,
        initialDoc: filePath,
        disableLogs: true,
        // licenseKey: 'this is a license key',
        enableFilePicker: true,
        enableOptimizedWorkers: true,
        isAdminUser: true,
        notesInLeftPanel: true,
        useDownloader:false,
      },
      viewer.current as HTMLElement
    ).then((instance) => {
      const { documentViewer } = instance.Core

      documentViewer.addEventListener('documentLoaded', () => {
        const doc = documentViewer.getDocument()

        doc
          .getDownloadLink({ filename: 'hello' })
          ?.then((link) => {

            setDownloadLink(link)
            console.log('LINK ===================>', link)
          })
          .catch((err: any) => {
            console.error('err =====================>', err)
          })

        doc.getLayersArray().then((layers) => {
          console.log(layers)

          // Set all layers to not visible
          layers.forEach((_layer, index) => {
            layers[index].visible = false
          })
          doc.setLayersArray(layers)
          // clears page cache
          documentViewer.refreshAll()
          // redraws
          documentViewer.updateView()
        })
        setLoading(false)
      })
    })
  }, [])

  useEffect(() => {
    console.log(downloadLink)
  }, [downloadLink])

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
