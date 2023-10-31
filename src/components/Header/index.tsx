import { Col, Grid, Layout, Row } from 'antd'
import React, { CSSProperties, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '~/context/UserContext'
import Button from '../Button'
import SearchField from '../Inputs/SearchField'
import menuIcon from '~/assets/icons/menu.svg'
import bellIcon from '~/assets/icons/bell.svg'
import './style.scss'
import UserPopup from '../UserPopup'

interface HeaderProps {
  isCollapsed?: boolean
  toggleSidebar: () => void
  style?: React.CSSProperties
}

const searchFieldStyles: CSSProperties = { height: 48 }

const Header = ({ toggleSidebar, style }: HeaderProps) => {
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
              <img src={menuIcon} alt='' />
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
                <img src={bellIcon} alt='' width={22} />
              </Button>
            </div>
            <div className='userContainer'>
              <UserPopup user={user} sm={sm} />
            </div>
          </div>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header
