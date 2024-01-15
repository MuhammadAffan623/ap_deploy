import BasicModal from '../BasicModal/'
import { ModalProps, Row, Space, Typography } from 'antd'
import Button from '../Button'
import './style.scss'

interface IModal extends ModalProps {
  title: string
  message: string
  loading?: boolean
  onCancel: () => void
  onOk: () => void
}

const ConfirmationModal = ({
  title,
  message,
  open,
  onCancel,
  onOk,
  loading = false,
  ...rest
}: IModal) => {
  return (
    <BasicModal open={open} onCancel={onCancel} {...rest}>
      <div>
        <Typography.Title level={5}>{title}</Typography.Title>
        <Typography.Text>{message}</Typography.Text>
        <Row justify='end'>
          <Space>
            <Button size='middle' type='primary' loading={loading} onClick={onOk} danger>
              Confirm
            </Button>
            <Button size='middle' onClick={onCancel}>
              Cancel
            </Button>
          </Space>
        </Row>
      </div>
    </BasicModal>
  )
}

export default ConfirmationModal
