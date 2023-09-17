import { Layout, SiderProps, Grid } from 'antd'
import Drawer from '../Drawer/Drawer'
import { CSSProperties } from 'react'
// import './Sidebar.scss'
interface SidebarProps extends SiderProps {
  drawerStyles: CSSProperties
  sidebarStyles: CSSProperties
  children: ReactNode
  setCollapsed: (collapsed: boolean) => void
}

const Sidebar = ({
  drawerStyles,
  sidebarStyles,
  width,
  collapsible,
  collapsed,
  setCollapsed,
  children,
  ...rest
}: SidebarProps): ReactNode => {
  const { useBreakpoint } = Grid
  const { lg } = useBreakpoint()

  if (lg) {
    return (
      <Layout.Sider
        trigger={null}
        collapsible={collapsible}
        collapsed={collapsed}
        width={width}
        style={sidebarStyles}
        {...rest}
      >
        {children}
      </Layout.Sider>
    )
  }
  return (
    <Drawer
      placement='left'
      closable={collapsible}
      open={collapsed}
      setOpen={setCollapsed}
      headerStyle={{ display: 'none' }}
      bodyStyle={{
        padding: 0
      }}
      width={width}
      style={drawerStyles}
      {...rest}
    >
      {children}
    </Drawer>
  )
}

export default Sidebar
