import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { authApi } from '~/store/services/auth.services'

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
    const loginUser = (state: IUserState, user: IUser, token: string) => {
      state.user = user
      state.token = token
      localStorage.setItem('token', token)
    }

    builder.addMatcher(authApi?.endpoints?.login?.matchFulfilled, (state, { payload }) => {
      loginUser(state, payload?.data, payload?.token)
    })
  }
})

export const { setUser } = userSlice.actions
