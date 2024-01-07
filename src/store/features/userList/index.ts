import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '~/store/services/auth.services'

interface IState {
  users: IUser[] | []
}

const initialState: IState = {
  users: []
}

export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(authApi?.endpoints?.getAllUser?.matchFulfilled, (state, { payload }) => {
      state.users = payload.data
    })
  }
})
