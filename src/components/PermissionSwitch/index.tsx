import { Col, Row, Typography, Switch } from 'antd'
import React from 'react'
import './styles.scss'

interface IPermissionProps {
  name: string
  title: string
  description: string
  boldTitle?: boolean
  selectedPermissions?: string[]
  childrenPermissions?: IPermission[]
  permissionRowClass?: string
  onChange: (value: boolean, name: string) => void
}

const PermissionSwitch = ({
  name,
  title,
  boldTitle = true,
  selectedPermissions = [],
  description,
  childrenPermissions = [],
  permissionRowClass = '',
  onChange
}: IPermissionProps) => {
  return (
    <Row
      align='middle'
      justify='space-between'
      className={['permission-row', permissionRowClass].join(' ')}
    >
      <Col span={20} className='text-col'>
        <Typography.Paragraph className={['title', boldTitle ? 'bold' : ''].join(' ')}>
          {title}
        </Typography.Paragraph>
        <Typography.Text className='description'>{description}</Typography.Text>
      </Col>
      <Col className='switch-col'>
        {childrenPermissions?.length === 0 && (
          <Switch
            defaultChecked={selectedPermissions.includes(name)}
            checked={selectedPermissions.includes(name)}
            onChange={(newValue) => onChange(newValue, name)}
          />
        )}
      </Col>
      {childrenPermissions?.length > 0 && (
        <Col span={24} className='children-col'>
          <Row gutter={[0, 10]}>
            {childrenPermissions?.map((permission: IPermission) => (
              <Col span={24} key={permission.value}>
                <PermissionSwitch
                  title={permission.label}
                  name={permission.value}
                  boldTitle={boldTitle}
                  selectedPermissions={selectedPermissions}
                  onChange={onChange}
                  description=''
                />
              </Col>
            ))}
          </Row>
        </Col>
      )}
    </Row>
  )
}

export default PermissionSwitch
