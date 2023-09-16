declare global {
  type ReactNode =
    | React.ReactElement<unknown>
    | FunctionComponent<unknown>
    | React.ComponentClass<unknown>
    | null

  interface IBase extends Record<string, unknown> {
    id?: string | number
    _id?: string | number
    createdAt?: string
    updatedAt?: string
  }
  interface IUser extends IBase {
    avatarUrl?: string | null
    name: string
    email: string
    username: string
    phoneNumber: string
    isActive?: boolean
    isBlocked?: boolean
    role: string
  }
}

export {}
