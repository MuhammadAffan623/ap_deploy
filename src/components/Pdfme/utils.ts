import {
  Template,
  Font,
  getInputFromTemplate,
  getDefaultFont,
  DEFAULT_FONT_NAME
} from '@pdfme/common'
import { Form, Viewer, Designer } from '@pdfme/ui'
import { generate } from '@pdfme/generator'
import {
  multiVariableText,
  text,
  readOnlyText,
  barcodes,
  image,
  readOnlyImage,
  svg,
  readOnlySvg,
  line,
  tableBeta,
  rectangle,
  ellipse
} from '@pdfme/schemas'
import plugins from './plugins'
import axios from 'axios'

const fontObjList = [
  {
    fallback: true,
    label: 'NotoSerifJP-Regular',
    url: '/fonts/NotoSerifJP-Regular.otf'
  },
  {
    fallback: false,
    label: 'NotoSansJP-Regular',
    url: '/fonts/NotoSansJP-Regular.otf'
  },
  {
    fallback: false,
    label: DEFAULT_FONT_NAME,
    data: getDefaultFont()[DEFAULT_FONT_NAME].data
  }
]

export const getFontsData = async () => {
  const fontDataList = (await Promise.all(
    fontObjList.map(async (font) => ({
      ...font,
      data: font.data || (await fetch(font.url || '').then((res) => res.arrayBuffer()))
    }))
  )) as { fallback: boolean; label: string; data: ArrayBuffer }[]

  return fontDataList.reduce((acc, font) => ({ ...acc, [font.label]: font }), {} as Font)
}
export const getBlankTemplate = () =>
  ({ schemas: [{}], basePdf: { width: 210, height: 297, padding: [0, 0, 0, 0] } } as Template)

export const getPlugins = () => {
  return {
    Text: text,
    'Read-Only Text': readOnlyText,
    'Multi-Variable Text': multiVariableText,
    Table: tableBeta,
    Line: line,
    Rectangle: rectangle,
    Ellipse: ellipse,
    Image: image,
    'Read-Only Image': readOnlyImage,
    SVG: svg,
    'Read-Only SVG': readOnlySvg,
    Signature: plugins.signature,
    QR: barcodes.qrcode,
    JAPANPOST: barcodes.japanpost,
    EAN13: barcodes.ean13
  }
}

export const generatePDF = async (currentRef: Designer | Form | Viewer | null) => {
  if (!currentRef) return
  const template = currentRef.getTemplate()
  const inputs =
    typeof (currentRef as Viewer | Form).getInputs === 'function'
      ? (currentRef as Viewer | Form).getInputs()
      : getInputFromTemplate(template)
  const font = await getFontsData()

  try {
    const pdf = await generate({
      template,
      inputs,
      options: {
        font,
        title: 'pdfme'
      },
      plugins: getPlugins()
    })

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' })
    window.open(URL.createObjectURL(blob))
  } catch (e) {
    alert(e + '\n\nCheck the console for full stack trace')
    throw e
  }
}
export const cloneDeep = (obj: unknown) => JSON.parse(JSON.stringify(obj))

export const fetchFileAsDataURL = async (fileUrl: string) => {
  try {
    console.log({ fileUrl })
    const response = await axios.get(fileUrl, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    })
    console.log({ response })
    const blob = response.data
    console.log({ blob })
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error('Error fetching the file:', error)
    throw error
  }
}
