import { useEffect } from 'react'
import { Drawer as AntDrawer, DrawerProps as AntDrawerProps } from 'antd'

interface DrawerProps extends AntDrawerProps {
  setOpen: (value: boolean) => void
  children: ReactNode
}

const Drawer = ({ open, setOpen, children, ...rest }: DrawerProps) => {
  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <AntDrawer
      open={open}
      closable={true}
      afterOpenChange={(open) => {
        setOpen(open)
      }}
      className='antdDrawer'
      headerStyle={{ display: 'none' }}
      onClose={() => {
        setOpen(false)
      }}
      {...rest}
    >
      {children}
    </AntDrawer>
  )
}

export default Drawer
