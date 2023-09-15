import { SiderProps, theme } from 'antd'
import Sidebar from './Sidebar/Sidebar'

interface SidebarProps extends SiderProps {
  setCollapsed: (collapsed: boolean) => void
}

const Sider = ({ collapsible, collapsed, style, setCollapsed, ...rest }: SidebarProps) => {
  const { useToken } = theme
  const { token } = useToken()
  const { colorBgContainer, colorPrimary, colorText } = token

  return (
    <Sidebar
      setCollapsed={setCollapsed}
      collapsible={collapsible}
      collapsed={collapsed}
      sidebarStyles={{
        background: colorPrimary,
        backgroundColor: colorPrimary,
        color: colorText,
        maxHeight: '100vh',
        borderRight: `0.5px solid ${colorBgContainer}`,
        ...style
      }}
      drawerStyles={{
        color: colorText,
        background: colorPrimary,
        backgroundColor: colorPrimary,
        borderRight: `0.5px solid ${colorBgContainer}`,

        ...style
      }}
      {...rest}
    >
      sidebar
    </Sidebar>
  )
}

export default Sider
