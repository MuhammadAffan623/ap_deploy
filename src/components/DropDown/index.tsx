import { Button, Dropdown as AntDropDown, Space } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons'

const DropDown = ({
  items,
  handleClickItem,
  onPopupClick,
  dot,
  color = 'black',
  title = 'Actions'
}: {
  items: MenuProps['items']
  handleClickItem?: (e: string) => void
  onPopupClick?: (e: any) => void
  dot?: boolean
  title?: string
  color?: string
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
    <AntDropDown menu={menuProps}>
      {dot ? (
        <Button type='text' style={{ color: color }}>
          <EllipsisOutlined rev={false} />
        </Button>
      ) : (
        <Button size='large' style={{ boxShadow: 'none' }}>
          <Space>
            {title}
            <DownOutlined rev={false} />
          </Space>
        </Button>
      )}
    </AntDropDown>
  )
}

export default DropDown
