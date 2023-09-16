import React, { useReducer, useState, useContext } from 'react'
import { userReducer, UserActionType, UserState } from '~/reducer/userReducer'

export const UserContext = React.createContext<IUserContext>({} as IUserContext)
export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

export interface IUserContainer {
  children: ReactNode[] | ReactNode
}

interface IUserContext {
  state: UserState
  loading: boolean
  loginUser: (user: IUser, token: string) => void
  logoutUser: () => void
  updateUser: (user: IUser) => void
}

export interface IUserData {
  isLoading: boolean
  user: IUser | null
}

const initialState: UserState = {
  token: localStorage.getItem('jwt_access_token') ?? '',
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '') : null
}

export function UserContainer({ children }: IUserContainer): ReactNode {
  const [state, dispatch] = useReducer(userReducer, initialState)
  const [loading, setLoading] = useState<boolean>(true)

  const loginUser = (user: IUser, token: string): void => {
    dispatch({ type: UserActionType.LOGIN, payload: { user, token } })
    setLoading(false)
  }

  const logoutUser = (): void => {
    dispatch({ type: UserActionType.LOGOUT, payload: {} })
  }

  const updateUser = (user: IUser): void => {
    dispatch({ type: UserActionType.UPDATE_USER, payload: { user } })
  }

  return (
    <UserProvider
      value={{
        loading,
        state,
        loginUser,
        logoutUser,
        updateUser
      }}
    >
      {children}
    </UserProvider>
  )
}

export default UserContainer

export const useUserContext = (): IUserContext => useContext(UserContext)
