import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { authApi } from '~/store/services/auth.services'

interface IUserPermissions {
  key: string
  name: string
}

interface IUserState {
  user: IUser | null
  token: string | null
  loading: boolean
  userPermissions: IUserPermissions[] | []
}

const initialState: IUserState = {
  loading: true,
  token: null,
  user: null,
  userPermissions: []
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
    },
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      window.location.reload()
    }
  },

  extraReducers: (builder) => {
    const loginUser = (state: IUserState, user: IUser, token: string) => {
      state.user = user
      state.token = token
      localStorage.setItem('token', token)
      if (user.group) {
        state.userPermissions = [
          ...user.group.permissions.user,
          ...user.group.permissions.management,
          ...user.group.permissions.advanced
        ]
      }
    }

    builder.addMatcher(authApi?.endpoints?.login?.matchFulfilled, (state, { payload }) => {
      loginUser(state, payload?.data, payload?.token)
    })

    builder.addMatcher(authApi?.endpoints?.updateProfile?.matchFulfilled, (state, { payload }) => {
      state.user = payload.data
    })

    builder.addMatcher(
      authApi?.endpoints?.getUserFromToken?.matchFulfilled,
      (state, { payload }) => {
        const token = localStorage.getItem('token') || ''
        loginUser(state, payload?.data, token)
      }
    )
  }
})

export const { setUser, logout } = userSlice.actions
