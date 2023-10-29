import BellOutlined from '@ant-design/icons/BellOutlined'
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined'
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined'
import { Col, Grid, Layout, Row } from 'antd'
import React, { CSSProperties, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '~/context/UserContext'
import { getInitials } from '~/utils/helper'
import Avatar from '../Avatar'
import Button from '../Button'
import SearchField from '../Inputs/SearchField'
import './style.scss'

interface HeaderProps {
  isCollapsed?: boolean
  toggleSidebar: () => void
  style?: React.CSSProperties
}

const searchFieldStyles: CSSProperties = { height: 48 }
const settingsIconStyles: CSSProperties = { fontSize: 30 }

const Header = ({ isCollapsed, toggleSidebar, style }: HeaderProps) => {
  const { state } = useUserContext()
  const { user } = state
  const [search, setSearch] = useState('')
  const { useBreakpoint } = Grid
  const { sm } = useBreakpoint()
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const navigate = useNavigate()
  const styleFormItem: CSSProperties = isSearchVisible ? { width: '100%' } : { width: 45 }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(search, 'search')
    }, 1000)
    return () => clearTimeout(timeout)
  }, [search])

  useEffect(() => {
    setIsSearchVisible(sm as boolean)
  }, [sm])

  return (
    <Layout.Header className='userHeader' style={{ ...style }}>
      <Row align='middle' className='row' gutter={20}>
        <Col span={isSearchVisible ? 24 : 10} sm={12} md={15} lg={18}>
          <div style={{ display: 'flex' }}>
            <Button type='default' className='toggleMenuBtn' onClick={toggleSidebar}>
              {isCollapsed ? <MenuUnfoldOutlined rev='rev' /> : <MenuFoldOutlined rev='rev' />}
            </Button>

            <SearchField
              inverseBg
              inputClass={['searchField', sm && 'sm'].join(' ')}
              value={search}
              onChange={handleSearchChange}
              placeholder='Search ...'
              style={searchFieldStyles}
              styleFormItem={{ transition: 'width 400ms', ...styleFormItem }}
              onFocus={() => {
                !sm && setIsSearchVisible(true)
              }}
              onBlur={() => {
                !sm && setIsSearchVisible(false)
              }}
            />
          </div>
        </Col>

        <Col span={isSearchVisible ? 0 : 14} sm={12} md={9} lg={6}>
          <div className='userDetailsWrapper'>
            <div className='settings'>
              <Button
                type='text'
                className='toggleSettingsBtn'
                onClick={() => navigate('/admin/my-account')}
              >
                <BellOutlined rev='rev' style={settingsIconStyles} />
              </Button>
            </div>
            <div className='userContainer'>
              <Avatar src={user?.avatarUrl as string} shape='circle'>
                {getInitials(user?.name as string)}
              </Avatar>
              <span className='userName'>{sm ? user?.name : user?.name.split(' ')[0]}</span>
            </div>
          </div>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header
