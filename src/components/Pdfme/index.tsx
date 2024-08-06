import { useEffect, useRef, useState } from 'react'
import { Template, Lang } from '@pdfme/common'
import { Designer } from '@pdfme/ui'
import {
  getFontsData,
  getBlankTemplate,
  getPlugins,
  generatePDF
} from './utils'

const Pdfme = ({}): ReactNode => {
  const designerRef = useRef<HTMLDivElement | null>(null)
  const designer = useRef<Designer | null>(null)
  const [lang] = useState<Lang>('en')

  const buildDesigner = () => {
    let template: Template = getBlankTemplate()
    getFontsData().then((font) => {
      console.log({ font })

      if (designerRef.current) {
        designer.current = new Designer({
          domContainer: designerRef.current,
          template,
          options: {
            font,
            lang,
            labels: {
              clear: '🗑️' // Add custom labels to consume them in your own plugins
            },
            theme: {
              token: {
                colorPrimary: '#25c2a0'
              }
            },
            icons: {
              multiVariableText:
                '<svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.643,13.072,17.414,2.3a1.027,1.027,0,0,1,1.452,0L20.7,4.134a1.027,1.027,0,0,1,0,1.452L9.928,16.357,5,18ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>'
            }
          },
          plugins: getPlugins()
        })
        designer.current.onSaveTemplate(onSaveTemplate)
      }
    })
  }
  const onSaveTemplate = (template?: Template) => {
    if (designer.current) {
      console.log({ template })
      alert('Saved not implemented to DB!')
    }
  }
  useEffect(() => {
    buildDesigner()
  }, [])
  return (
    <div>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 1rem',
          height: '40px',
          fontSize: 'small'
        }}
      >
        <strong>Generate Form</strong>
        <button onClick={() => generatePDF(designer.current)}>Generate PDF</button>
      </header>
      <div ref={designerRef} style={{ width: '100%', height: `calc(100vh - 45px)` }} />
    </div>
  )
}

export default Pdfme
