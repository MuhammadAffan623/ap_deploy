import { Tabs } from 'antd'
import All from './Tabs/All'
import { PageHeader } from '~/components'
import { useState } from 'react'
import Archived from './Tabs/Archived'
import Active from './Tabs/Active'
import Completed from './Tabs/Completed'
import AddProject from './AddProject'

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
  const [addEditContactModalOpen, setAddEditContactModalOpen] = useState(false)
  const [contact, setContact] = useState<Partial<IProject>>({})

  const handleSelectChange = (value: string) => {
    setSelectedFilter(value)
  }
  console.log(setContact)

  const handleCloseAddEditContactModal = (status: boolean) => {
    setAddEditContactModalOpen(status)
  }
  return (
    <div>
      <PageHeader
        title='Project'
        buttonText='Add'
        onButtonClick={() => {
          handleCloseAddEditContactModal(true)
        }}
        selectValue={selectedFilter}
        onSelectChange={handleSelectChange}
      />
      <Tabs defaultActiveKey='1' type='card' size='large' items={tabsItems} />

      <AddProject
        open={addEditContactModalOpen}
        handleClose={handleCloseAddEditContactModal}
        contact={contact}
      />
    </div>
  )
}

export default Project
