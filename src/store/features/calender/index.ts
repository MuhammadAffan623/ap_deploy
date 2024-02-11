import { createSlice } from '@reduxjs/toolkit'
import { calenderApi } from '~/store/services/calender.service'

interface IState {
  calenders: ICalender[] | []
}

const initialState: IState = {
  calenders: []
}

export const calenderSlice = createSlice({
  name: 'calenderSlice',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(
      calenderApi?.endpoints?.getAllCalender?.matchFulfilled,
      (state, { payload }) => {
        state.calenders = payload.data.calendarItems
      }
    )
  }
})
