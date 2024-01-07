import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { groupsApi } from '~/store/services/groups.service'

interface IGroupsState {
  groups: IUserGroup[]
}

const initialState: IGroupsState = {
  groups: []
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
      const data = [...payload.data]
      state.groups = data.reverse()
    })
  }
})

export const { setGroups } = groupsSlice.actions
