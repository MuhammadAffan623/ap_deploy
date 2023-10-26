declare global {
  type ReactNode =
    | React.ReactElement<unknown>
    | FunctionComponent<unknown>
    | React.ComponentClass<unknown>
    | null

  type KeyValuePair = {
    [key: string]: any
  }

  interface IBase extends Record<string, unknown> {
    _id: string
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
  interface IForm extends IBase {
    name: string
    owner: string
    version: string
    status?: boolean
  }

  interface IOption {
    label: string
    value: string
  }

  interface IPagination {
    current: number
    pageSize: number
    total: number
  }
}

export {}
