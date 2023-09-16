import React from 'react'
import { Result, Row, theme } from 'antd'
import { Link } from 'react-router-dom'
import './NotFound.scss'

const NotFound: React.FC = () => {
  const { useToken } = theme
  const { token } = useToken()
  const { colorBgElevated } = token

  return (
    <Row justify='center' align='middle' style={{ height: '100vh', backgroundColor: colorBgElevated }}>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={<Link to='/'>Back Home</Link>}
        className='antResultCard'
      />
    </Row>
  )
}

export default NotFound
