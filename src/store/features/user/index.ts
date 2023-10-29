import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUserByToken } from '~/services/user.services'

interface IUserState {
  user: IUser | null
  token: string | null
  loading: boolean
}

const initialState: IUserState = {
  loading: true,
  token: null,
  user: null
}

const getUserAsync = createAsyncThunk(
  'user/get',
  async (token: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await getUserByToken(token)
      return fulfillWithValue(data?.data as Partial<IUserState>)
    } catch (error: any) {
      return rejectWithValue(error?.response?.data)
    }
  },
  {}
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<Omit<IUserState, 'loading'>>) => {
      state.user = payload.user
      state.token = payload.token
    },
    updateUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.rejected, (state) => {
        state.loading = false
        state.user = null
        state.token = null
      })
      .addCase(getUserAsync.fulfilled, (state, { payload }) => {
        state.user = payload?.user as IUser
        state.token = payload.token as string
        state.loading = false
      })
      .addCase(getUserAsync.pending, (state) => {
        state.loading = true
      })
  }
})

export const { setUser } = userSlice.actions
