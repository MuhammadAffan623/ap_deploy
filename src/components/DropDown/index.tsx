import { Button, Dropdown as AntDropDown, Space } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons'

const DropDown = ({
  items,
  handleClickItem,
  dot,
  title = 'Actions'
}: {
  items: MenuProps['items']
  handleClickItem: (e: string) => void
  dot?: boolean
  title?: string
}) => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    handleClickItem(e.key)
  }

  const menuProps = {
    items,
    onClick: handleMenuClick
  }
  return (
    <AntDropDown menu={menuProps}>
      <Button size='large' style={{ boxShadow: 'none' }}>
        {dot ? (
          <EllipsisOutlined rev={false} />
        ) : (
          <Space>
            {title}
            <DownOutlined rev={false} />
          </Space>
        )}
      </Button>
    </AntDropDown>
  )
}

export default DropDown
