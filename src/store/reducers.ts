import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './features/user'
import { groupsSlice } from './features/groups'
import { eventSlice } from './features/events'
import { userListSlice } from './features/userList'
import { contactsSlice } from './features/contact'
import { librarySlice } from './features/library'
import { calenderSlice } from './features/calender'

import { authApi } from './services/auth.services'
import { fileApi } from './services/file.services'
import { groupsApi } from './services/groups.service'
import { contactApi } from './services/contact.services'
import { libraryApi } from './services/library.service'
import { formApi } from './services/form.service'
import { templateApi } from './services/template.service'
import { projectApi } from './services/project.service'
import { calenderApi } from './services/calender.service'
import { eventApi } from './services/event.service'
import { dashoboardApi } from './services/dashboard.services'

export interface RootState {
  user: ReturnType<typeof userSlice.reducer>
  userList: ReturnType<typeof userListSlice.reducer>
  groups: ReturnType<typeof groupsSlice.reducer>
  events: ReturnType<typeof eventSlice.reducer>
  library: ReturnType<typeof librarySlice.reducer>
  calender: ReturnType<typeof calenderSlice.reducer>
}

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  userList: userListSlice.reducer,
  groups: groupsSlice.reducer,
  events: eventSlice.reducer,
  library: librarySlice.reducer,
  contacts: contactsSlice.reducer,
  calender: calenderSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
  [groupsApi.reducerPath]: groupsApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [libraryApi.reducerPath]: libraryApi.reducer,
  [formApi.reducerPath]: formApi.reducer,
  [templateApi.reducerPath]: templateApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [calenderApi.reducerPath]: calenderApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [dashoboardApi.reducerPath]: dashoboardApi.reducer
})
