import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { groupsApi } from '~/store/services/groups.service'

interface IGroupsState {
  groups: IUserGroup[]
  loading: boolean
}

const initialState: IGroupsState = {
  groups: [],
  loading: false
}

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, { payload }: PayloadAction<IUserGroup[]>) => {
      state.groups = payload
    }
  },

  extraReducers: (builder) => {
    builder.addMatcher(groupsApi?.endpoints?.getGroups?.matchFulfilled, (state, { payload }) => {
      console.log("payload", payload)
      state.groups = payload.data
    })
  }
})

export const { setGroups } = groupsSlice.actions
