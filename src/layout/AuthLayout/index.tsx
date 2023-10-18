import React from 'react'
import './style.scss'
import { Outlet } from 'react-router-dom'
import { ImagesBox } from '~/components'
import Logo from '~/assets/images/logo.svg'
import { Typography } from 'antd'

const AuthLayout = () => {
  return (
    <div className='auth-wrapper'>
      <div className='blue-box'>
        <div className='img-container'>
          <ImagesBox src={Logo} width='100%' height='100%' />
          <Typography.Text className='logo-text'>APSON</Typography.Text>
        </div>
      </div>
      <div className='content-wrapper'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
