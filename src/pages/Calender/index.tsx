import React, { useMemo, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import AddEditEvent from './AddEditEvent'
import EventDetail from './EventDetail'
import AddNewCalender from './AddNewCalender'
import { ConfirmationModal, PageHeader } from '~/components'
import usePermission from '~/hooks/usePermission'
import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core'
import { useDeleteEventMutation, useGetAllEventsQuery } from '~/store/services/event.service'
import { setCalenderModalClose } from '~/store/features/events'
import { useAppDispatch, useCalenderSelector, useEventSelector } from '~/store/hooks'
import { message } from 'antd'
import './styles.scss'

const Calender: React.FC = () => {
  const [weekendsVisible] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [showConfiramtion, setShowConfiramtion] = useState<boolean>(false)
  const [isEventModal, setIsEventModal] = useState<boolean>(false)
  const [event, setEvent] = useState<any>(null)
  const [eventId, setEventId] = useState<any>(null)
  const [startDate, setStartDate] = useState<any>(null)

  const { events, calenderSideBarOpen } = useEventSelector()
  const [deleteEventApi] = useDeleteEventMutation()
  const dispatch = useAppDispatch()
  const { isCalenderManagement } = usePermission()
  const { calendarIds } = useCalenderSelector()
  const { data } = useGetAllEventsQuery({ calendarIds })
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setEvent(null)
    setEditMode(false)
    setStartDate(selectInfo.start.toISOString())
    isCalenderManagement ? setOpen(true) : setOpen(false)
    const calendarApi = selectInfo.view.calendar
    calendarApi.unselect()
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (data) {
      setEvent({
        id: clickInfo.event.extendedProps._id,
        title: clickInfo.event.title,
        start: clickInfo.event.start,
        end: clickInfo.event.end,
        color: clickInfo.event.backgroundColor,
        description: clickInfo.event.extendedProps.description
      })
      setIsEventModal(true)
    }
  }

  const handleDeleteEvent = (id: string) => {
    setEventId(id)
    setShowConfiramtion(true)
    setIsEventModal(false)
  }

  const confirmDeleteEvent = () => {
    deleteEventApi({ id: eventId })
      .unwrap()
      .then(() => {
        setShowConfiramtion(false)
        message.success('Event deleted successfully')
      })
      .catch((err) => message.error(err?.data?.error))
  }

  const renderEventContent = (eventContent: EventContentArg) => (
    <div>
      <b>{eventContent.timeText}</b>
      <span style={{ marginLeft: 2 }}>{eventContent.event.title}</span>
    </div>
  )

  const renderSidebar = () => {
    return (
      <div className={`demo-app-sidebar ${calenderSideBarOpen ? '' : 'display-hidden'}`}>
        <AddNewCalender handleClose={() => dispatch(setCalenderModalClose())} />
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title='Calender'
        buttonText={isCalenderManagement ? 'Add Event' : ''}
        onButtonClick={() => {
          setEditMode(false)
          setStartDate(null)
          setOpen(true)
        }}
      />

      <div className='demo-app'>
        {calenderSideBarOpen && renderSidebar()}

        {useMemo(
          () => (
            <div className='demo-app-main'>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={weekendsVisible}
                events={events}
                select={handleDateSelect}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
              />
            </div>
          ),
          [events]
        )}

        <AddEditEvent
          open={open}
          isEdit={editMode}
          handleClose={() => {
            setEditMode(false)
            setOpen(false)
          }}
          event={event}
          startDate={startDate}
        />

        <EventDetail
          open={isEventModal}
          handleClose={() => setIsEventModal(false)}
          onDelete={handleDeleteEvent}
          onEdit={(event) => {
            setEditMode(true)
            setOpen(true)
            setEvent(event)
            setIsEventModal(false)
          }}
          event={event}
          isActionEnabled={isCalenderManagement}
        />

        <ConfirmationModal
          title='Deleting Event'
          message='Are you sure you want to delete it?'
          open={showConfiramtion}
          onOk={confirmDeleteEvent}
          onCancel={() => setShowConfiramtion(false)}
        />
      </div>
    </>
  )
}

export default Calender
