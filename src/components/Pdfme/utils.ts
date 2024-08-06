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
