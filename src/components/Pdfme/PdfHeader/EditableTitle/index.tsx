import React, { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
interface IEditProp {
  text: string
  setText: (value: string) => void
}
const EditableText = ({ text, setText }: IEditProp) => {
  const [isEditing, setIsEditing] = useState(false)
  const [date] = useState('8/22/2023 9:03 AM')

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e: any) => {
    setText(e.target.value)
  }

  const handleInputBlur = () => {
    setIsEditing(false)
  }

  return (
    <div>
      {isEditing ? (
        <input
          type='text'
          value={text}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
        />
      ) : (
        <h1>
          {text} <FaPencilAlt onClick={handleEditClick} style={{ cursor: 'pointer' }} />
        </h1>
      )}
      <p>Published at {date}</p>
    </div>
  )
}

export default EditableText
