import { Tag } from 'antd'
import React from 'react'

const Pill = ({
  text,
  textColor,
  bgColor
}: {
  text: string
  textColor: string
  bgColor: string
}) => {
  return (
    <Tag
      style={{
        padding: '5px 8px',
        borderRadius: '47px',
        minWidth: '100px',
        textAlign: 'center',
        cursor: 'pointer',
        color: textColor,
        borderColor: bgColor,
        backgroundColor: bgColor
      }}
    >
      {text}
    </Tag>
  )
}

export default Pill
