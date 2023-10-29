import { Col, Row, Typography, theme } from 'antd'
import React from 'react'

interface IDetailsProps {
  label: string
  value: string
}

const Detail = ({ label, value }: IDetailsProps) => {
  const { useToken } = theme
  const {
    token: { colorTextTertiary }
  } = useToken()

  return (
    <Row justify='space-between'>
      <Col>
        <Typography.Text>{label}:</Typography.Text>
      </Col>
      <Col>
        <Typography.Text style={{ color: colorTextTertiary }}>{value ?? 'N/A'}</Typography.Text>
      </Col>
    </Row>
  )
}

export default Detail
