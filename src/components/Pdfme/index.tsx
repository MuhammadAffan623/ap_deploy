import { useEffect, useRef, useState } from 'react';
import { Template, Lang } from '@pdfme/common';
import { Designer } from '@pdfme/ui';
import { getFontsData, getBlankTemplate, getPlugins, generatePDF, fetchFileAsDataURL, cloneDeep } from './utils';
import FileUploadModal from './fileModal';
import { useGetFileMutation } from '~/store/services/file.services';
import PdfHeader from './PdfHeader';

const Pdfme = () => {
  const queryParams = new URLSearchParams(location.search);
  const fileKey = queryParams.get('fileKey');
  const fileAwsVersionId = queryParams.get('fileAwsVersionId');
  const keysExist = fileAwsVersionId && fileKey;
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);
  const [lang] = useState<Lang>('en');
  const [openModal, setOpenModal] = useState(!keysExist);
  const [getFile] = useGetFileMutation();

  const buildDesigner = () => {
    let template: Template = getBlankTemplate();
    getFontsData().then((font) => {
      if (designerRef.current) {
        designer.current = new Designer({
          domContainer: designerRef.current,
          template,
          options: {
            font,
            lang,
            labels: {
              clear: '🗑️',
            },
            theme: {
              token: {
                colorPrimary: '#25c2a0',
              },
            },
            icons: {
              multiVariableText: '<svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.643,13.072,17.414,2.3a1.027,1.027,0,0,1,1.452,0L20.7,4.134a1.027,1.027,0,0,1,0,1.452L9.928,16.357,5,18ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>',
            },
          },
          plugins: getPlugins(),
        });
        designer.current.onSaveTemplate(onSaveTemplate);
      }
    });
  };

  const onSaveTemplate = (template?: Template) => {
    if (designer.current) {
      console.log({ template });
      alert('Saved not implemented to DB!');
    }
  };

  useEffect(() => {
    buildDesigner();
    if (fileKey && fileAwsVersionId) {
      getFile({
        key: fileKey,
        versionId: fileAwsVersionId,
      })
        .unwrap()
        .then((res: any) => {
          if (res.data) {
            updateBasePDF(res.data);
          }
        })
        .catch((error: any) => {});
    }
  }, [fileKey, fileAwsVersionId]);

  const updateBasePDF = async (fileUrl: string) => {
    try {
      const basePdf = await fetchFileAsDataURL(fileUrl);
      if (designer.current) {
        designer.current.updateTemplate(
          Object.assign(cloneDeep(designer.current.getTemplate()), {
            basePdf,
          })
        );
      }
    } catch (error) {
      console.error('Error fetching and converting file:', error);
    }
  };

  const handleGeneratePDF = () => {
    if (designer.current) {
      generatePDF(designer.current);
    } else {
      console.error('Designer instance is not initialized');
    }
  };

  const handleSaveDraft = () => {
    console.log('Save Draft clicked');
  };

  const handlePublish = () => {
    console.log('Publish clicked');
  };

  return (
    <div>
      <PdfHeader onPreview={handleGeneratePDF} onSaveDraft={handleSaveDraft} onPublish={handlePublish} />
      <div ref={designerRef} style={{ width: '100%', height: `calc(100vh - 45px)` }} />
      <FileUploadModal open={openModal} handleClose={() => setOpenModal(false)} formSubmitHandler={() => {}} />
    </div>
  );
};

export default Pdfme;
