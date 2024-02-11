import { createSlice } from '@reduxjs/toolkit'
import { eventApi } from '~/store/services/event.service'

interface IState {
  events: ICalender[] | []
  calenderSideBarOpen: boolean
}

const initialState: IState = {
  events: [],
  calenderSideBarOpen: false
}

export const eventSlice = createSlice({
  name: 'eventSlice',
  initialState,
  reducers: {
    setCalenderModalOpen: (state) => {
      state.calenderSideBarOpen = true
    },
    setCalenderModalClose: (state) => {
      state.calenderSideBarOpen = false
    }
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      eventApi?.endpoints?.getAllEvents?.matchFulfilled,
      (state, { payload }: any) => {
        const modifiedData = payload.data?.eventItems.map((item: IEvent) => ({
          ...item,
          title: item.name,
          start: item.startTime,
          end: item.endTime
        }))
        state.events = modifiedData
      }
    )
  }
})

export const { setCalenderModalClose, setCalenderModalOpen } = eventSlice.actions
