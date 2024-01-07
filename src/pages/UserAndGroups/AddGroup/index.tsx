import { Col, Form, Popover, Row, Typography, message } from 'antd'
import React, { useState } from 'react'
import { FaGear } from 'react-icons/fa6'
import { Button, Card, PageHeader, PermissionSwitch, TextField } from '~/components'
import { managementPermissions, userPermissions } from '~/utils/helper'
import AdvancedUserPermissions from './AdvancedUserPermissions'
import { FaInfoCircle } from 'react-icons/fa'
import './styles.scss'
import { useCreateGroupsMutation } from '~/store/services/groups.service'
import { useNavigate } from 'react-router-dom'

interface IGroupPermissions {
  userPermissions: IGroupPermissionsKeyValue[]
  managementPermissions: IGroupPermissionsKeyValue[]
  formsHubPermissions: IGroupPermissionsKeyValue[]
  blueprintHubPermissions: IGroupPermissionsKeyValue[]
  calendarPermissions: IGroupPermissionsKeyValue[]
}

const content = (
  <div>
    <p>Click to set advance permission</p>
  </div>
)

const AddGroup = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [permissions, setPermissions] = React.useState<IGroupPermissions>({
    managementPermissions: [],
    userPermissions: [],
    formsHubPermissions: [],
    blueprintHubPermissions: [],
    calendarPermissions: []
  })

  const [advancedPermissionsModalOpen, setAdvancedPermissionsModalOpen] = useState(false)

  const [createUserGroup, { isLoading }] = useCreateGroupsMutation()

  const handleSubmit = (values: any) => {
    // console.log('Values ===========================>', values)
    // console.log('permissions ======================>', permissions)

    const advancedPermissions = [
      ...permissions.blueprintHubPermissions,
      ...permissions.calendarPermissions,
      ...permissions.formsHubPermissions
    ]

    const body = {
      name: values.name,
      permissions: {
        management: permissions.managementPermissions,
        user: permissions.userPermissions,
        advance: advancedPermissions
      }
    }

    createUserGroup(body)
      .unwrap()
      .then((res) => {
        navigate('/user-and-groups')
        message.success(res.message)
      })
      .catch((err) => {
        message.error(err?.data?.error)
      })
  }

  const handleAdvancedPermissionsModalClose = (status: boolean, _data?: any) => {
    if (status) {
      setAdvancedPermissionsModalOpen(false)
    } else {
      setAdvancedPermissionsModalOpen(false)
    }
  }

  const handlePermissionChange = (
    value: boolean,
    name: string,
    label: string,
    permissionType: TPermissions
  ) => {
    if (value) {
      setPermissions({
        ...permissions,
        [permissionType]: [...permissions[permissionType], { name: label, key: name }]
      })
    } else {
      setPermissions({
        ...permissions,
        [permissionType]: permissions[permissionType].filter((item) => item.key !== name)
      })
    }
  }

  return (
    <>
      <Row gutter={[20, 20]} className='add-group-page'>
        <Col span={24}>
          <PageHeader title='Add Group' />
        </Col>

        <Col span={24}>
          <Card>
            <Form
              form={form}
              onFinish={handleSubmit}
              initialValues={{ managementPermissions: [], name: '' }}
            >
              <Row gutter={[60, 20]}>
                <Col span={24}>
                  <div className='group-save-button'>
                    <Button type='primary' htmlType='submit' loading={isLoading}>
                      Save
                    </Button>
                  </div>
                  <TextField
                    name='name'
                    label='Group Name'
                    required
                    placeholder='Write a Group Name'
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
                          onChange={(value, name) => {
                            handlePermissionChange(
                              value,
                              name,
                              permission.label,
                              'managementPermissions'
                            )
                          }}
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
                      <Popover content={content} title='Advance Permission' placement='topLeft'>
                        <Button
                          style={{ fontSize: '1.2rem' }}
                          icon={<FaGear />}
                          type='text'
                          onClick={() => {
                            setAdvancedPermissionsModalOpen(true)
                          }}
                        />
                      </Popover>
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
                          onChange={(value, name, label) => {
                            handlePermissionChange(value, name, label as string, 'userPermissions')
                          }}
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
