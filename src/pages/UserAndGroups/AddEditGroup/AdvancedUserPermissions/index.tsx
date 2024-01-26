import { Col, Row, Tabs, Typography, TabPaneProps } from 'antd'
import React from 'react'
import { BasicModal, IconTag } from '~/components'
import AdvancedUserPermissionsTable from './AdvancedPermissionsTable'
import { blueprintsHubPermissions, calendarPermissions, formsHubPermissions } from '~/utils/helper'
import { FaCalendar, FaListCheck } from 'react-icons/fa6'
import './styles.scss'

interface IAdvancedUserPermissionsProps {
  open: boolean
  handleClose: (status: boolean) => void
  onChange: (value: boolean, name: string, label: string, permissionType: TPermissions) => void
  selectedPermissions: {
    formsHubPermissions: IGroupPermissionsKeyValue[]
    blueprintHubPermissions: IGroupPermissionsKeyValue[]
    calendarPermissions: IGroupPermissionsKeyValue[]
  }
}
interface Tab extends Omit<TabPaneProps, 'tab'> {
  key: string
  label: React.ReactNode
}

const AdvancedUserPermissions = ({
  open,
  handleClose,
  onChange,
  selectedPermissions
}: IAdvancedUserPermissionsProps) => {
  const permissionsTabsData: Tab[] = [
    {
      key: 'formsHubPermissions',
      tabKey: 'formsHubPermissions',
      label: (
        <Typography.Text style={{ display: 'flex', alignItems: 'center' }}>
          <IconTag style={{ fontSize: '1.2rem' }} icon={<FaListCheck />} />
          Forms Hub
        </Typography.Text>
      ),
      children: (
        <AdvancedUserPermissionsTable
          title='Name'
          onChange={(value, name, label) => onChange(value, name, label, 'formsHubPermissions')}
          permissions={formsHubPermissions}
          selectedPermissions={selectedPermissions.formsHubPermissions}
        />
      )
    },
    {
      key: 'blueprintsHubPermissions',
      tabKey: 'blueprintsHubPermissions',
      label: (
        <Typography.Text style={{ display: 'flex', alignItems: 'center' }}>
          <IconTag style={{ fontSize: '1.2rem' }} icon={<FaCalendar />} />
          Blueprints Hub
        </Typography.Text>
      ),
      children: (
        <AdvancedUserPermissionsTable
          title='Name'
          onChange={(value, name, label) => onChange(value, name, label, 'blueprintHubPermissions')}
          permissions={blueprintsHubPermissions}
          selectedPermissions={selectedPermissions.blueprintHubPermissions}
        />
      )
    },
    {
      key: 'calendarPermissions',
      tabKey: 'calendarPermissions',
      label: (
        <Typography.Text style={{ display: 'flex', alignItems: 'center' }}>
          <IconTag style={{ fontSize: '1.2rem' }} icon={<FaCalendar />} />
          Calendar
        </Typography.Text>
      ),
      children: (
        <AdvancedUserPermissionsTable
          title='Name'
          onChange={(value, name, label) => onChange(value, name, label, 'calendarPermissions')}
          permissions={calendarPermissions}
          selectedPermissions={selectedPermissions.calendarPermissions}
        />
      )
    }
  ]

  return (
    <BasicModal
      open={open}
      onCancel={() => {
        handleClose(false)
      }}
      width={1200}
      bodyStyle={{ minHeight: '60vh' }}
    >
      <Row gutter={[20, 60]}>
        <Col span={24}>
          <Typography.Title level={4}>User Permissions Advanced</Typography.Title>
        </Col>

        <Col span={24}>
          <Tabs tabPosition='left' items={permissionsTabsData} className='permissions-tabs' />
        </Col>
      </Row>
    </BasicModal>
  )
}

export default AdvancedUserPermissions
