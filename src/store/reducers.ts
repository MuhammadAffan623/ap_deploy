import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './features/user'
import { groupsSlice } from './features/groups'

export interface RootState {
  user: ReturnType<typeof userSlice.reducer>
  groups: ReturnType<typeof groupsSlice.reducer>
}

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  groups: groupsSlice.reducer
})
