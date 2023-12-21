import { Tabs } from 'antd'
import All from './Tabs/All'
import './style.scss'
import { PageHeader } from '~/components'
import { useState } from 'react'
import Available from './Tabs/Available'
import Disabled from './Tabs/Disabled'
import Archived from './Tabs/Archived'
import AddEditForm from './AddEditForm'

const tabsItems = [
  {
    label: (
      <span>
        All <span className='tab-count'>10</span>
      </span>
    ),
    key: '1',
    children: <All />
  },
  {
    label: (
      <span>
        Available <span className='tab-count'>10</span>
      </span>
    ),
    key: '2',
    children: <Available />
  },
  {
    label: (
      <span>
        Disabled <span className='tab-count'>10</span>
      </span>
    ),
    key: '3',
    children: <Disabled />
  },
  {
    label: (
      <span>
        Archived <span className='tab-count'>10</span>
      </span>
    ),
    key: '4',
    children: <Archived />
  }
]

const Forms = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('last7days')
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleAdd = () => {
    setShowModal(true)
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
      <AddEditForm
        open={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      />
    </div>
  )
}

export default Forms
