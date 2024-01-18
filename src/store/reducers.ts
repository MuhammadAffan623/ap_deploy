import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './features/user'
import { groupsSlice } from './features/groups'
import { eventsSlice } from './features/events'
import { userListSlice } from './features/userList'
import { librarySlice } from './features/library'
import { authApi } from './services/auth.services'
import { fileApi } from './services/file.services'
import { groupsApi } from './services/groups.service'
import { contactsSlice } from './features/contact'
import { contactApi } from './services/contact.services'
import { libraryApi } from './services/library.service'

export interface RootState {
  user: ReturnType<typeof userSlice.reducer>
  userList: ReturnType<typeof userListSlice.reducer>
  groups: ReturnType<typeof groupsSlice.reducer>
  events: ReturnType<typeof eventsSlice.reducer>
  library: ReturnType<typeof librarySlice.reducer>
}

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  userList: userListSlice.reducer,
  groups: groupsSlice.reducer,
  events: eventsSlice.reducer,
  library: librarySlice.reducer,
  contacts: contactsSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
  [groupsApi.reducerPath]: groupsApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [libraryApi.reducerPath]: libraryApi.reducer
})
