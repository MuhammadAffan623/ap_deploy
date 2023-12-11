import React, { useEffect, useMemo, useState } from 'react'
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate
} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'
import './styles.scss'
import AddEditEvent from './AddEditEvent'
import { getEventsAsync } from '~/store/features/events'
import { useAppDispatch } from '~/store/hooks'
import { useSelector } from 'react-redux'
import { RootState } from '~/store/reducers'
import EventDetail from './EventDetail'

const DemoApp: React.FC = () => {
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true)
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [isEventModal, setIsEventModal] = useState<boolean>(false)
  const [event, setEvent] = useState<any>(null)

  const dispatch = useAppDispatch()
  const { events } = useSelector((state: RootState) => state.events)

  useEffect(() => {
    dispatch(getEventsAsync(11))
  }, [dispatch])

  useEffect(() => {
    console.log('events', events)
    setCurrentEvents(events as any)
  }, [events])

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible)
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // const title = prompt('Please enter a new title for your event')
    setOpen(true)
    const calendarApi = selectInfo.view.calendar
    console.log('handleDateSelect', selectInfo)
    calendarApi.unselect() // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
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

    // console.log('title:', clickInfo.event.title)
    // console.log('start:', clickInfo.event.start)
    // console.log('end:', clickInfo.event.end)
    // console.log('id:', clickInfo.event.backgroundColor)
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
  }

  const handleDeleteEvent = () => {
    if (event.clickInfo) {
      event.clickInfo.event.remove()
      setEvent(null), setIsEventModal(false)
    }
  }

  const handleEvents = (events: EventApi[]) => {
    console.log('events', events)
    setCurrentEvents(events)
  }

  const renderEventContent = (eventContent: EventContentArg) => (
    <>
      <b>{eventContent.timeText}</b>
      <span>{eventContent.event.title}</span>
    </>
  )

  const renderSidebarEvent = (event: EventApi) => (
    <li key={event.id}>
      <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <span>{event.title}</span>
    </li>
  )

  const renderSidebar = () => {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    )
  }

  console.log('envets', events)

  return (
    <div className='demo-app'>
      {/* {renderSidebar()} */}

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
              // initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
              events={events}
              select={handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClick}
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

      <AddEditEvent
        open={open}
        handleClose={() => setOpen(false)}
        event={event}
        // calendarApi={calendarApi}
      />

      <EventDetail
        open={isEventModal}
        handleClose={() => setIsEventModal(false)}
        onDelete={handleDeleteEvent}
        event={event}
      />
    </div>
  )
}

export default DemoApp
