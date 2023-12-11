import { Typography } from 'antd'
import { BasicModal, Button, ColorIcon } from '~/components'
import { EventInput } from '@fullcalendar/core'
import './styles.scss'
import { formatDate } from '~/utils/helper'
import { BsTrash } from 'react-icons/bs'

interface IProps {
  open: boolean
  handleClose: (status: boolean) => void
  onDelete?: () => void
  isEdit?: boolean
  event: Partial<EventInput> | null
}

const EventDetail = ({ event, handleClose, onDelete, open }: IProps) => {
  return (
    <BasicModal
      open={open}
      onCancel={() => {
        handleClose(false)
      }}
    >
      <Typography.Title level={3}>
        <ColorIcon color={event?.color || 'tomato'} /> {event?.title}
      </Typography.Title>

      <Typography.Text>
        {formatDate(event?.start as string)} - {formatDate(event?.end as string)}
      </Typography.Text>

      <Button onClick={onDelete}>
        <BsTrash color='red' />
      </Button>
    </BasicModal>
  )
}

export default EventDetail
