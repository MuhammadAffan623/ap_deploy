/* eslint-disable @typescript-eslint/no-empty-function */
import { Space, Typography } from 'antd'
import { BasicModal, Button, ColorIcon } from '~/components'
import { EventInput } from '@fullcalendar/core'
import './styles.scss'
import { formatDate } from '~/utils/helper'
import { BsCalendar, BsClock, BsList, BsPencil, BsThreeDots, BsTrash } from 'react-icons/bs'

interface IProps {
  open: boolean
  handleClose: (status: boolean) => void
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
  isEdit?: boolean
  event: Partial<EventInput> | null
  isActionEnabled?: boolean
}

const EventDetail = ({ event, handleClose, onDelete, onEdit, open, isActionEnabled }: IProps) => {
  return (
    <BasicModal
      open={open}
      onCancel={() => {
        handleClose(false)
      }}
    >
      {isActionEnabled && (
        <div className='action-buttons'>
          <Button onClick={onEdit ? () => onEdit(event?.id as string) : () => {}}>
            <BsPencil size={16} />
          </Button>
          <Button onClick={onDelete ? () => onDelete(event?.id as string) : () => {}}>
            <BsTrash size={16} />
          </Button>
          <Button>
            <BsThreeDots size={16} />
          </Button>
        </div>
      )}
      <div className='modal-content'>
        <Space className='list-item'>
          <ColorIcon color={event?.color || 'tomato'} />
          <Typography.Title level={3}>{event?.title}</Typography.Title>
        </Space>
        <Space className='list-item'>
          <BsClock />
          <Typography.Text>
            {formatDate(event?.start as string)} - {formatDate(event?.end as string)}
          </Typography.Text>
        </Space>
        <Space className='list-item'>
          <BsList />
          <Typography.Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Alias a consequuntur necessitatibus repellendus id aperiam est
            quibusdam? Deleniti, rerum cupiditate quos repellat aperiam, nesciunt numquam veritatis
            minus perspiciatis delectus nulla?
          </Typography.Paragraph>
        </Space>
        <Space className='list-item'>
          <BsCalendar />
          <Typography.Paragraph>Important</Typography.Paragraph>
        </Space>
      </div>
    </BasicModal>
  )
}

export default EventDetail
