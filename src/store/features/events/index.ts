import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getEventsApi } from '~/services/events.services'
import { message } from '~/store/toast'

interface IInitialState {
  events: IEvent[]
  loading: boolean
  calenderSideBarOpen: boolean
}

const initialState: IInitialState = {
  events: [],
  loading: false,
  calenderSideBarOpen: false
}

export const getEventsAsync = createAsyncThunk(
  'events/get',
  async (count: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await getEventsApi(count)
      return fulfillWithValue(res)
    } catch (error: any) {
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, { payload }: PayloadAction<IEvent[]>) => {
      state.events = payload
    },
    addEvent: (state, { payload }: PayloadAction<IEvent[]>) => {
      state.events = [...payload, ...state.events]
    },
    setCalenderModalOpen: (state) => {
      state.calenderSideBarOpen = true
    },
    setCalenderModalClose: (state) => {
      state.calenderSideBarOpen = false
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getEventsAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(getEventsAsync.rejected, (state, { payload }: PayloadAction<any>) => {
        state.loading = false
        message.error(payload.message)
      })
      .addCase(getEventsAsync.fulfilled, (state, { payload }) => {
        state.events = payload
        state.loading = false
      })
  }
})

export const { setEvents, addEvent, setCalenderModalClose, setCalenderModalOpen } =
  eventsSlice.actions
