import { EventInput } from '@fullcalendar/core'

let eventGuid = 0
const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
const endStr = new Date('2023-12-05').toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    end: endStr,
    color: '#FF965D',
    className:"event"
  },
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    end: endStr,
    color: '#FF965D',
    className:"event"
  },
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    end: endStr,
    color: '#FF965D',
    className:"event"
  },
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    end: endStr,
    color: '#FF965D',
    className:"event"
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  },
]

export function createEventId() {
  return String(eventGuid++)
}
