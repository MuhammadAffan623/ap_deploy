import { Col, Row, Typography, Switch } from 'antd'
import './styles.scss'

interface IPermissionProps {
  name: string
  title: string
  description: string
  boldTitle?: boolean
  selectedPermissions?: IGroupPermissionsKeyValue[]
  childrenPermissions?: IPermission[]
  permissionRowClass?: string
  onChange: (value: boolean, name: string, lable?: string) => void
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
            defaultChecked={selectedPermissions.some((permission) => permission.key === name)}
            checked={selectedPermissions.some((permission) => permission.key === name)}
            onChange={(newValue) => onChange(newValue, name, title)}
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
                  onChange={(value, name) => {
                    onChange(value, name, permission.label)
                  }}
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
