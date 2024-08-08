import React from 'react';
import { Button } from 'antd';
import EditableText from './EditableTitle';

interface HeaderProps {
  onPreview: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

const PdfHeader: React.FC<HeaderProps> = ({ onPreview, onSaveDraft, onPublish }) => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 1rem',
        height: '120px',
        fontSize: 'small',
      }}
    >
      <EditableText />
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button type='primary' size='large' onClick={onPreview} className='btn'>
          Preview
        </Button>
        <Button
          size='large'
          style={{ backgroundColor: 'white', color: 'black' }}
          className='btn'
          onClick={onSaveDraft}
        >
          Save Draft
        </Button>
        <Button
          type='primary'
          size='large'
          className='btn'
          style={{ backgroundColor: '#148D09' }}
          onClick={onPublish}
        >
          Publish
        </Button>
      </div>
    </header>
  );
};

export default PdfHeader;
