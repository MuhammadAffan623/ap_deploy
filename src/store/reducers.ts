import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './features/user'
import { groupsSlice } from './features/groups'
import { eventsSlice } from './features/events'
import { authApi } from './services/auth.services'
import { fileApi } from './services/file.services'

export interface RootState {
  user: ReturnType<typeof userSlice.reducer>
  groups: ReturnType<typeof groupsSlice.reducer>
  events: ReturnType<typeof eventsSlice.reducer>
}

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  groups: groupsSlice.reducer,
  events: eventsSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer
})
