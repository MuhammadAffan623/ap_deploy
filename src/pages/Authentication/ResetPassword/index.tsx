import { Divider, Form, Typography, message } from 'antd'
import { Link } from 'react-router-dom'
import { Button, TextField } from '~/components'
import './style.scss'
import { useResetPasswordMutation } from '~/store/services/auth.services'

const ResetPassword = () => {
  const [resetPasswordEmail, { isLoading }]: any = useResetPasswordMutation()

  const handleSubmit = (values: KeyValuePair) => {
    resetPasswordEmail(values)
      .unwrap()
      .then(() => message.success('Email send successfully'))
      .catch((error: any) => {
        message.error(error?.data?.error || 'Somthing went wrong')
      })
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

        <Button loading={isLoading} type='primary' htmlType='submit' className='auth-button'>
          Send
        </Button>
      </Form>
    </div>
  )
}

export default ResetPassword
