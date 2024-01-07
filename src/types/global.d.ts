import { EventInput } from '@fullcalendar/core'

declare global {
  type ReactNode =
    | React.ReactElement<unknown>
    | FunctionComponent<unknown>
    | React.ComponentClass<unknown>
    | null

  type KeyValuePair = {
    [key: string]: any
  }

  type TPermissions =
    | 'managementPermissions'
    | 'userPermissions'
    | 'formsHubPermissions'
    | 'blueprintHubPermissions'
    | 'calendarPermissions'

  interface IBase extends Record<string, unknown> {
    _id?: string
    createdAt?: string
    updatedAt?: string
  }
  interface IDevice {
    deviceType: string
    name: string
    lastSync: string
    appVersion: string
    os: string
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
    groups?: Partial<IUserGroup>[] | string[]
    password?: string
    confirmPassword: string
    activeDevices?: IDevice[]
  }

  interface IProject extends IBase {
    address: string
    name: string
  }

  interface ILibrary extends IBase {
    title: string
    category: string
    status: string
    url: string
    file: any
  }

  interface IUserGroup extends IBase {
    name: string
    users: Partial<IUser>[]
    handleEdit?: () => void
  }

  interface IPermission {
    label: string
    value: string
    children?: IPermission[]
  }
  interface IForm extends IBase {
    name: string
    owner: string
    version: string
    status?: boolean
  }

  interface IBlueForm extends IBase {
    name: string
    tags: string
    updated: string
    version: string
    status?: boolean
  }

  interface IEvent extends EventInput {
    _id: string
    title: string
    description: string
    color: string
    start: string
    end: string
    className: string
    // users: IUser
    createdAt: string
    updatedAt: string
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
