import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import './style.scss'
import ColorIcon from '~/components/ColorIcon'

export interface IItem {
  key: string
  label: string
  color: string
  icon: ReactNode
}

const CustomSelect = ({
  handleChange,
  options: items = []
}: {
  handleChange: (key: string) => void
  options: IItem[]
}) => {
  const [key, setKey] = useState('liniting-schedule')
  const [color, setColor] = useState('tomato')

  const handleSelect = ({ key }: { key: React.Key }) => {
    const findObj: IItem | undefined = items.find((item: IItem) => item?.key === key)
    setColor(findObj ? findObj.color : '')
    setKey(key as string)
    handleChange(key as string)
  }

  const getSelectedValueLabel = () => {
    const findObj: IItem | undefined = items.find((item: IItem) => item?.key === key)
    return findObj ? findObj?.label : ''
  }

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: ['liniting-schedule'],
        onSelect: handleSelect
      }}
    >
      <Space className='custom-select'>
        <Space>
          <ColorIcon color={color} /> {getSelectedValueLabel()}
        </Space>
        <DownOutlined rev />
      </Space>
    </Dropdown>
  )
}

export default CustomSelect
