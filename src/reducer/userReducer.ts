export enum UserActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPDATE_USER = 'UPDATE_USER'
}

export interface UserState {
  token: string | null
  user: IUser | null
}

export interface UserAction {
  type: UserActionType
  payload?: any
}

export const userReducer = (state: UserState, action: UserAction): UserState => {
  const { type, payload } = action

  switch (type) {
    case UserActionType.LOGIN:
      return {
        ...state,
        token: payload.token as string,
        user: payload.user as IUser
      }

    case UserActionType.LOGOUT:
      return {
        ...state,
        token: null,
        user: null
      }

    case UserActionType.UPDATE_USER:
      return {
        ...state,
        user: payload.user as IUser
      }
    default:
      return state
  }
}
