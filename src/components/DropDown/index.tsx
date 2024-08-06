import { Button, Dropdown as AntDropDown, Space } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons'
import RevIcon from '../RevIcons'

const DropDown = ({
  items,
  handleClickItem,
  onPopupClick,
  dot,
  color = 'black',
  title = 'Actions',
  overlayClassName
}: {
  items: MenuProps['items']
  handleClickItem?: (e: string) => void
  onPopupClick?: (e: any) => void
  dot?: boolean
  title?: string
  color?: string
  overlayClassName?: string
}) => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    handleClickItem && handleClickItem(e.key)
    onPopupClick && onPopupClick(e)
  }

  const menuProps = {
    items,
    onClick: handleMenuClick
  }
  return (
    <AntDropDown overlayClassName={overlayClassName}  menu={menuProps}>
      {dot ? (
        <Button size='small' type='text' style={{ color: color }}>
          <RevIcon rev='rev'>
          <EllipsisOutlined />
          </RevIcon>
        </Button>
      ) : (
        <Button size='large' style={{ boxShadow: 'none' }}>
          <Space >
            {title}
            <RevIcon  rev='rev'>

            <DownOutlined  />
            </RevIcon>
          </Space>
        </Button>
      )}
    </AntDropDown>
  )
}

export default DropDown
