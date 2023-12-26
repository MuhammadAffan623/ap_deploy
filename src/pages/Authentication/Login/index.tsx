import { Divider, Form, Typography, message } from 'antd'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, TextField } from '~/components'
import { useLoginMutation } from '~/store/services/auth.services'
import './style.scss'

const Login = () => {
  const [login, { isLoading, isError, error }]: any = useLoginMutation()

  const handleSubmit = (values: KeyValuePair) => {
    login(values)
  }

  useEffect(() => {
    if (isError) {
      message?.error(error?.data?.error)
    }
  }, [error])

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

        <Button loading={isLoading} type='primary' htmlType='submit' className='auth-button'>
          Sign in
        </Button>
      </Form>
    </div>
  )
}

export default Login
