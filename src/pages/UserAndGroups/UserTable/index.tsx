import { Tabs } from 'antd'
import All from './Tabs/All'
import './style.scss'

import Active from './Tabs/Active'
import Disabled from './Tabs/Disabled'

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
        Disabled <span className='tab-count'>10</span>
      </span>
    ),
    key: '3',
    children: <Disabled />
  }
]

const UserTable = () => {
  return (
    <div>
      <Tabs defaultActiveKey='1' type='card' size='large' items={tabsItems} />
    </div>
  )
}

export default UserTable
