import React, { CSSProperties } from 'react'
import { Layout } from 'antd'
import './Header.scss'

interface HeaderProps {
  isCollapsed?: boolean
  toggleSidebar: () => void
  style?: React.CSSProperties
}

const Header = ({ isCollapsed, toggleSidebar, style }: HeaderProps) => {
  return (
    <Layout.Header className='header' style={{ ...style }}>
      Header
    </Layout.Header>
  )
}

export default Header
