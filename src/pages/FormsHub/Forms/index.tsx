import { Tabs } from 'antd'
import All from './Tabs/All'
import './style.scss'
import { PageHeader } from '~/components'
import { useState } from 'react'
import Available from './Tabs/Available'
import Disabled from './Tabs/Disabled'
import Archived from './Tabs/Archived'

const tabsItems = [
  {
    label: `All`,
    key: 'all',
    children: <All />
  },
  {
    label: `Available`,
    key: 'available',
    children: <Available />
  },
  {
    label: `Disabled`,
    key: 'disabled',
    children: <Disabled />
  },
  {
    label: `Archived`,
    key: 'archived',
    children: <Archived />
  }
]

const Forms = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('last7days')

  const handleAdd = () => {
    // console.log('')
  }
  const handleSelectChange = (value: string) => {
    setSelectedFilter(value)
  }
  return (
    <div>
      <PageHeader
        title='Forms'
        buttonText='Add Form'
        showSelect
        options={[
          { label: 'Last 7 days', value: 'last7days' },
          { label: 'Last month', value: 'lastmonth' }
        ]}
        onButtonClick={handleAdd}
        selectValue={selectedFilter}
        onSelectChange={handleSelectChange}
      />
      <Tabs defaultActiveKey='1' type='card' size='large' items={tabsItems} />
    </div>
  )
}

export default Forms
