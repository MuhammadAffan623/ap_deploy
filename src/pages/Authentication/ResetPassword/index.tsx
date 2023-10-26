import { Divider, Form, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField } from '~/components'
import './style.scss'

const ResetPassword = () => {
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
        Reset your password
      </Typography.Title>
      <Typography.Title level={5} style={{ fontWeight: 400, color: '#8692A6' }}>
        Enter your email to reset your password
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

        <Link to='/login' className='auth-link'>
          Go back
        </Link>

        <Button loading={loading} type='primary' htmlType='submit' className='auth-button'>
          Send
        </Button>
      </Form>
    </div>
  )
}

export default ResetPassword
