import React, { useEffect, useMemo, useState } from 'react'
import { EventApi, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import AddEditEvent from './AddEditEvent'
import { getEventsAsync } from '~/store/features/events'
import { useAppDispatch } from '~/store/hooks'
import { useSelector } from 'react-redux'
import { RootState } from '~/store/reducers'
import EventDetail from './EventDetail'
import AddNewCalender from './AddNewCalender'
import './styles.scss'
import { PageHeader } from '~/components'

const Calender: React.FC = () => {
  const [weekendsVisible] = useState<boolean>(true)
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [isEventModal, setIsEventModal] = useState<boolean>(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const [event, setEvent] = useState<any>(null)

  const dispatch = useAppDispatch()
  const { events } = useSelector((state: RootState) => state.events)

  useEffect(() => {
    dispatch(getEventsAsync(11))
  }, [dispatch])

  useEffect(() => {
    setCurrentEvents(events as any)
  }, [events])

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setOpen(true)
    const calendarApi = selectInfo.view.calendar
    calendarApi.unselect()
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    setEvent({
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      color: clickInfo.event.backgroundColor,
      clickInfo
    })
    setIsEventModal(true)
  }

  const handleDeleteEvent = () => {
    if (event.clickInfo) {
      event.clickInfo.event.remove()
      setEvent(null)
      setIsEventModal(false)
    }
  }

  const handleEvents = (events: EventApi[]) => {
    console.log('currentEvents', currentEvents)
    setCurrentEvents(events)
  }

  const handleEventMouseEnter = (mouseEnterInfo: any) => {
    const eventDetail = mouseEnterInfo.event
    console.log(eventDetail)
  }

  const renderEventContent = (eventContent: EventContentArg) => (
    <div>
      <b>{eventContent.timeText}</b>
      <span>{eventContent.event.title}</span>
    </div>
  )

  const renderSidebar = () => {
    return (
      <div className='demo-app-sidebar'>
        <AddNewCalender handleClose={() => setIsSidebarOpen(false)} />
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title='Calender'
        buttonText='Add Event'
        onButtonClick={() => {
          setOpen(true)
        }}
      />

      <div className='demo-app'>
        {isSidebarOpen && renderSidebar()}

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
                eventMouseEnter={handleEventMouseEnter}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
              eventAdd={function(){}}
              eventChange={function(){}}
              eventRemove={function(){}}
              
              */
              />
            </div>
          ),
          [events]
        )}

        <AddEditEvent open={open} handleClose={() => setOpen(false)} event={event} />

        <EventDetail
          open={isEventModal}
          handleClose={() => setIsEventModal(false)}
          onDelete={handleDeleteEvent}
          event={event}
        />
      </div>
    </>
  )
}

export default Calender
