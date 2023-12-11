// import { AxiosResponse } from 'axios'
// import http from '~/http'

import { getMockEvents } from '~/mocks'

export const getEventsApi = (count: number): Promise<IEvent[]> => {
  return new Promise((resolve) => {
    resolve(getMockEvents(count))
  })
}
