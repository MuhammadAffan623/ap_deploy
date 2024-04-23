/* eslint-disable @typescript-eslint/no-empty-function */
import { Space, Typography } from 'antd'
import { BasicModal, Button, ColorIcon } from '~/components'
import { EventInput } from '@fullcalendar/core'
import './styles.scss'
import { formatEventDate, formattedTime } from '~/utils/helper'
import { BsCalendar, BsClock, BsDash, BsList, BsPencil, BsTrash } from 'react-icons/bs'

interface IProps {
  open: boolean
  handleClose: (status: boolean) => void
  onDelete?: (id: string) => void
  onEdit?: (event: Partial<EventInput> | null) => void
  isEdit?: boolean
  event: Partial<EventInput> | null
  isActionEnabled?: boolean
}

const EventDetail = ({ event, handleClose, onDelete, onEdit, open, isActionEnabled }: IProps) => {
  return (
    <>
      <BasicModal
        open={open}
        onCancel={() => {
          handleClose(false)
        }}
      >
        {isActionEnabled && (
          <div className='action-buttons'>
            <Button onClick={onEdit ? () => onEdit(event) : () => {}}>
              <BsPencil size={16} />
            </Button>
            <Button onClick={onDelete ? () => onDelete(event?.id as string) : () => {}}>
              <BsTrash size={16} />
            </Button>
          </div>
        )}
        <div className='modal-content'>
          <Space className='list-item'>
            <ColorIcon color={event?.color || 'lightgrey'} />
            <Typography.Title level={3}>{event?.title}</Typography.Title>
          </Space>
          <Space className='list-item'>
            <BsClock />
            <Typography.Text>
              {formatEventDate(event?.start as string)} {formattedTime(event?.start  as string)} <BsDash />{' '}
              {formatEventDate((event?.end as string) ?? event?.start)} {event?.end && formattedTime(event?.end  as string)} 
            </Typography.Text>
          </Space>
          <Space className='list-item'>
            <BsList />
            <Typography.Paragraph>{event?.description}</Typography.Paragraph>
          </Space>
          <Space className='list-item'>
            <BsCalendar />
            <Typography.Paragraph>Important</Typography.Paragraph>
          </Space>
        </div>
      </BasicModal>
    </>
  )
}

export default EventDetail
