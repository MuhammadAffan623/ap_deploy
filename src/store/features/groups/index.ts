import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUserGroups } from '~/services/userGroups.services'
import { message } from '~/store/toast'

interface IGroupsState {
  groups: IUserGroup[]
  loading: boolean
}

const initialState: IGroupsState = {
  groups: [],
  loading: true
}

export const getGroupsAsync = createAsyncThunk(
  'groups/get',
  async (count: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const userGroups = await getUserGroups(count)
      return fulfillWithValue(userGroups)
    } catch (error: any) {
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, { payload }: PayloadAction<IUserGroup[]>) => {
      state.groups = payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getGroupsAsync.fulfilled, (state, { payload }) => {
        state.groups = payload
        state.loading = false
      })
      .addCase(getGroupsAsync.rejected, (state, { payload }: PayloadAction<any>) => {
        state.loading = false
        message.error(payload.message)
      })
      .addCase(getGroupsAsync.pending, (state) => {
        state.loading = true
      })
  }
})

export const { setGroups } = groupsSlice.actions
