import { Divider, Form, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField } from '~/components'
import './style.scss'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (values: KeyValuePair) => {
    setLoading(true)
    console.log(values)
    setLoading(false)
    navigate('/dashboard')
  }

  return (
    <div>
      <Typography.Title level={1} style={{ fontWeight: 500 }}>
        Sign in to your account
      </Typography.Title>
      <Typography.Title level={5} style={{ fontWeight: 400, color: '#8692A6' }}>
        Enter your details to sign in
      </Typography.Title>
      <Divider />

      <Form layout='vertical' onFinish={handleSubmit}>
        <TextField
          label='Email Address'
          type='email'
          name='email'
          placeholder='john@pra.com'
          message='Email is required'
          className='auth-input'
          formItemClass='auth-label'
          required
        />

        <TextField
          label='Password'
          type='password'
          name='password'
          placeholder='************'
          message='Password is required'
          className='auth-input'
          formItemClass='auth-label'
          styleFormItem={{ color: '#696F79' }}
          required
        />
        <Link to='/reset-password' className='auth-link'>
          Forgot password?
        </Link>

        <Button loading={loading} type='primary' htmlType='submit' className='auth-button'>
          Sign in
        </Button>
      </Form>
    </div>
  )
}

export default Login
