import { Col, Form, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { FaGear } from 'react-icons/fa6'
import { Button, Card, PermissionSwitch, TextField } from '~/components'
import { managementPermissions, userPermissions } from '~/utils/helper'
import AdvancedUserPermissions from './AdvancedUserPermissions'
import { FaInfoCircle } from 'react-icons/fa'
import './styles.scss'

interface IGroupPermissions {
  userPermissions: string[]
  managementPermissions: string[]
  formsHubPermissions: string[]
  blueprintHubPermissions: string[]
  calendarPermissions: string[]
}

const AddGroup = () => {
  const [form] = Form.useForm()
  const [permissions, setPermissions] = React.useState<IGroupPermissions>({
    managementPermissions: [],
    userPermissions: [],
    formsHubPermissions: [],
    blueprintHubPermissions: [],
    calendarPermissions: []
  })

  const [advancedPermissionsModalOpen, setAdvancedPermissionsModalOpen] = useState(false)

  const handleSubmit = (values: any) => {
    console.log('Values ===========================>', values)
    console.log('permissions ======================>', permissions)
  }

  const handleAdvancedPermissionsModalClose = (status: boolean, _data?: any) => {
    if (status) {
      setAdvancedPermissionsModalOpen(false)
    } else {
      setAdvancedPermissionsModalOpen(false)
    }
  }

  const handlePermissionChange = (value: boolean, name: string, permissionType: TPermissions) => {
    if (value) {
      setPermissions({
        ...permissions,
        [permissionType]: [...permissions[permissionType], name]
      })
    } else {
      setPermissions({
        ...permissions,
        [permissionType]: permissions[permissionType].filter((item) => item !== name)
      })
    }
  }

  return (
    <>
      <Row gutter={[20, 20]} className='add-group-page'>
        <Col span={24}>
          <Typography.Title level={2}>Add Group</Typography.Title>
        </Col>

        <Col span={24}>
          <Card>
            <Form
              form={form}
              onFinish={handleSubmit}
              initialValues={{ managementPermissions: [], name: 'Test' }}
            >
              <Row gutter={[60, 20]}>
                <Col span={24}>
                  <TextField
                    name='name'
                    label='Group Name'
                    labelCol={{
                      span: 24,
                      style: {
                        padding: 0
                      }
                    }}
                  />
                </Col>

                <Col span={24} md={12}>
                  <Typography.Title level={4}>Management Permissions</Typography.Title>
                  <Typography.Paragraph>
                    Allow Edit, Add or Delete the following:
                  </Typography.Paragraph>

                  <Row gutter={[20, 20]}>
                    {managementPermissions?.map((permission: IPermission) => (
                      <Col span={24} key={permission.value}>
                        <PermissionSwitch
                          title={permission.label}
                          name={permission.value}
                          selectedPermissions={permissions.managementPermissions}
                          childrenPermissions={permission?.children ?? []}
                          onChange={(value, name) =>
                            handlePermissionChange(value, name, 'managementPermissions')
                          }
                          description=''
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col span={24} md={12} className='user-permissions-col'>
                  <Row gutter={20} justify='space-between'>
                    <Col>
                      <Typography.Title level={4}>User Permissions</Typography.Title>
                    </Col>
                    <Col>
                      <Button
                        style={{ fontSize: '1.2rem' }}
                        icon={<FaGear />}
                        type='text'
                        onClick={() => {
                          setAdvancedPermissionsModalOpen(true)
                        }}
                      />
                    </Col>
                  </Row>

                  <Typography.Paragraph className='user-permission-instructions'>
                    Allow Edit or Add the following:
                  </Typography.Paragraph>
                  <Typography.Text className='gear-icon-info'>
                    <FaInfoCircle /> For more Granular Permissions click on gear icon{' '}
                  </Typography.Text>

                  <Row gutter={[20, 20]}>
                    {userPermissions?.map((permission: IPermission) => (
                      <Col span={24} key={permission.value}>
                        <PermissionSwitch
                          title={permission.label}
                          name={permission.value}
                          selectedPermissions={permissions.userPermissions}
                          onChange={(value, name) =>
                            handlePermissionChange(value, name, 'userPermissions')
                          }
                          childrenPermissions={permission?.children ?? []}
                          description=''
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>

      <AdvancedUserPermissions
        open={advancedPermissionsModalOpen}
        handleClose={handleAdvancedPermissionsModalClose}
        onChange={handlePermissionChange}
        selectedPermissions={{
          blueprintHubPermissions: permissions.blueprintHubPermissions,
          calendarPermissions: permissions.calendarPermissions,
          formsHubPermissions: permissions.formsHubPermissions
        }}
      />
    </>
  )
}

export default AddGroup
