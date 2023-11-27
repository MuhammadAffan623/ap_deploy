import { Tabs } from 'antd'
import All from './Tabs/All'
import './style.scss'
import { PageHeader } from '~/components'
import { useState } from 'react'
import Archived from './Tabs/Archived'
import Active from './Tabs/Active'
import Completed from './Tabs/Completed'

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
        Active <span className='tab-count'>10</span>
      </span>
    ),
    key: '2',
    children: <Active />
  },
  {
    label: (
      <span>
        Completed <span className='tab-count'>10</span>
      </span>
    ),
    key: '3',
    children: <Completed />
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

const Project = () => {
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
        title='Project'
        buttonText='Add'
        onButtonClick={handleAdd}
        selectValue={selectedFilter}
        onSelectChange={handleSelectChange}
      />
      <Tabs defaultActiveKey='1' type='card' size='large' items={tabsItems} />
    </div>
  )
}

export default Project
