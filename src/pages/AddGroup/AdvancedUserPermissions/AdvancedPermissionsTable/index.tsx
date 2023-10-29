import { Col, Row } from 'antd'
import React from 'react'
import { PermissionSwitch } from '~/components'
import './styles.scss'

interface IAdvancedUserPermissionsTable {
  title: string
  permissions: IPermission[]
  selectedPermissions: string[]
  onChange: (value: boolean, name: string) => void
}

const AdvancedUserPermissionsTable = ({
  permissions,
  onChange,
  title,
  selectedPermissions
}: IAdvancedUserPermissionsTable) => {
  return (
    <>
      <Row className='advanced-user-permission-row'>
        <Col span={24}>{title}</Col>
      </Row>
      {permissions.map((item) => {
        return (
          <PermissionSwitch
            name={item.value}
            description=''
            boldTitle={false}
            onChange={onChange}
            title={item.label}
            key={item.value}
            permissionRowClass='advanced-user-permission-row'
            selectedPermissions={selectedPermissions}
          />
        )
      })}
    </>
  )
}

export default AdvancedUserPermissionsTable
