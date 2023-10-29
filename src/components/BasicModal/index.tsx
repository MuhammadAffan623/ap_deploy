import { Modal, ModalProps } from 'antd'
import './styles.scss'

const BasicModal = ({
  open,
  centered = false,
  onCancel,
  width = 600,
  footer,
  children,
  ...rest
}: ModalProps) => {
  return (
    <Modal
      centered={centered ? centered : false}
      open={open}
      onCancel={onCancel}
      width={width}
      footer={footer ? footer : null}
      wrapClassName='customBasicModal'
      {...rest}
    >
      {children}
    </Modal>
  )
}

export default BasicModal
