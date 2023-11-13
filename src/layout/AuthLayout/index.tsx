import { Outlet } from 'react-router-dom'
import Logo from '~/assets/images/logo.svg'
import { ImagesBox } from '~/components'
import './style.scss'

const AuthLayout = () => {
  return (
    <div className='auth-wrapper'>
      <div className='blue-box'>
        <div className='logo-container'>
          <ImagesBox src={Logo} width='100%' height='100%' />
        </div>
      </div>
      <div className='content-wrapper'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
