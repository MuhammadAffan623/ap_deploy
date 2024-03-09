import { createSlice } from '@reduxjs/toolkit'
import { calenderApi } from '~/store/services/calender.service'

interface IState {
  calenders: ICalender[] | []
  calendarIds: string[] | []
}

const initialState: IState = {
  calenders: [],
  calendarIds: []
}

export const calenderSlice = createSlice({
  name: 'calenderSlice',
  initialState,
  reducers: {
    setCalendarIds: (state, { payload }) => {
      state.calendarIds = payload
    }
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      calenderApi?.endpoints?.getAllCalender?.matchFulfilled,
      (state, { payload }) => {
        state.calenders = payload.data.calendarItems
        state.calendarIds = payload.data.calendarItems.map((item: ICalender) => item._id)
      }
    )
  }
})

export const { setCalendarIds } = calenderSlice.actions
