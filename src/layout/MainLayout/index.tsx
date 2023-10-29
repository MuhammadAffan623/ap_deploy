import { Layout } from 'antd'
import { useState } from 'react'
import './styles.scss'

import { Outlet } from 'react-router-dom'
import { Header, SideBar } from '~/components'
const { Content } = Layout

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar
        breakpoint='xl'
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true)
          } else {
            setCollapsed(false)
          }
        }}
        width={300}
        collapsible
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Layout hasSider={false}>
        <Header toggleSidebar={toggleSidebar} isCollapsed={collapsed} />

        <Layout>
          <Content className='mainContent'>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout
