import { MenuProps } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import dayjs from 'dayjs'
import { CSSProperties, Key } from 'react'
import { PermissionEnums } from '~/enums/permission'

export const monthOptions: DefaultOptionType[] = [
  { label: 'Select Month', value: '' },
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' }
]

export const yearOptions: DefaultOptionType[] = [
  { label: 'Select Year', value: '' },
  ...Array.from({ length: dayjs().year() - 1970 + 1 }, (_, i) => {
    return { label: (1970 + i).toString(), value: (1970 + i).toString() }
  })
]

export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const usernameRegex = /\s/

export const phoneRegex = /^\+\d{1,3} \d{3} \d{7}$/

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~\-=?]).*$/

export const imageMimeTypeRegex = /(^image)(\/)[a-zA-Z0-9_]*/gm

export type MenuItem = Required<MenuProps>['items'][number]

export const getMenuItem = (
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[] | null,
  className?: string,
  style?: CSSProperties,
  onClick?: () => void,
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
    style,
    className,
    onClick
  } as MenuItem
}

export const getToken = () => {
  return localStorage.getItem('jwt_access_token')
}

export const getInitials = (str: string) => {
  const firstChar = str?.charAt(0)?.toUpperCase()
  return firstChar
}

export const managementPermissions: IPermission[] = [
  {
    label: 'Forms Hub',
    value: PermissionEnums.MANAGEMENT_FORMS_HUB
  },
  {
    label: 'Calendar',
    value: PermissionEnums.MANAGEMENT_CALENDAR
  },
  {
    label: 'Contacts',
    value: PermissionEnums.MANAGEMENT_CONTACTS
  },
  {
    label: 'Library',
    value: PermissionEnums.MANAGEMENT_LIBRARY
  },
  {
    label: 'Blueprints Hub',
    value: PermissionEnums.MANAGEMENT_BLUEPRINTS_HUB
  },
  {
    label: 'Device Management',
    value: PermissionEnums.MANAGEMENT_DEVICE_MANAGEMENT
  },
  {
    label: 'User Groups',
    value: PermissionEnums.MANAGEMENT_USERS_GROUPS
  },
  {
    label: 'Settings',
    value: PermissionEnums.MANAGEMENT_SETTINGS
  }
]

export const userPermissions: IPermission[] = [
  {
    label: 'Forms Hub',
    value: PermissionEnums.USER_FORMS_HUB,
    children: [
      {
        label: 'Form Templates',
        value: PermissionEnums.USER_FORM_TEMPLATES
      },
      {
        label: 'Forms',
        value: PermissionEnums.USER_FORMS
      },
      {
        label: 'Public Forms',
        value: PermissionEnums.USER_PUBLIC_FORMS
      },
      {
        label: 'Delivery Activity',
        value: PermissionEnums.USER_DELIVERY_ACTIVITY
      }
    ]
  },
  {
    label: 'Calendar',
    value:  PermissionEnums.USER_CALENDAR
  },
  {
    label: 'Contacts',
    value:  PermissionEnums.USER_CONTACTS
  },
  {
    label: 'Library',
    value:  PermissionEnums.USER_LIBRARY
  },
  {
    label: 'Blueprints Hub',
    value:  PermissionEnums.USER_BLUEPRINTS_HUB,
    children: [
      {
        label: 'Projects',
        value:  PermissionEnums.USER_PROJECTS
      }
    ]
  }
]

export const formsHubPermissions: IPermission[] = [
  {
    label: 'Allow export to PDF',
    value: PermissionEnums.ADVANCED_FORMS_HUB_EXPORT_PDF
  },
  {
    label: 'Add Tags to forms',
    value: PermissionEnums.ADVANCED_FORMS_HUB_ADD_TAGS
  },
  {
    label: 'Rename existing Forms',
    value: PermissionEnums.ADVANCED_FORMS_HUB_RENAME
  },
  {
    label: 'Delete forms',
    value: PermissionEnums.ADVANCED_FORMS_HUB_DELETE
  },
  {
    label: 'Create copies of forms',
    value: PermissionEnums.ADVANCED_FORMS_HUB_CREATE_COPIES
  },
  {
    label: 'Delete Public Form',
    value: PermissionEnums.ADVANCED_FORMS_HUB_DELETE_PUBLIC
  }
]

export const blueprintsHubPermissions: IPermission[] = [
  {
    label: 'Allow export to PDF',
    value: PermissionEnums.ADVANCED_BLUEPRINTS_HUB_EXPORT_PDF
  },
  {
    label: 'Add Tags to projects',
    value: PermissionEnums.ADVANCED_BLUEPRINTS_HUB_ADD_TAGS_PROJECT
  },
  {
    label: 'Rename existing Projects',
    value: PermissionEnums.ADVANCED_BLUEPRINTS_HUB_RENAME_PROJECT
  },
  {
    label: 'Delete Projects',
    value: PermissionEnums.ADVANCED_BLUEPRINTS_HUB_DELETE_PROJECT
  },
  {
    label: 'Email Plans',
    value: PermissionEnums.ADVANCED_BLUEPRINTS_HUB_EMAIL_PLANS
  },
  {
    label: 'Delete Annotations',
    value: PermissionEnums.ADVANCED_BLUEPRINTS_HUB_DELETE_ANNOTATIONS
  },
  {
    label: 'Change Status',
    value: PermissionEnums.ADVANCED_BLUEPRINTS_HUB_CHANGE_STATUS
  }
]

export const calendarPermissions: IPermission[] = [
  {
    label: 'Lining Schedule',
    value: 'Lining Schedule'
  },
  {
    label: 'Jax Schedule',
    value: 'Jax Schedule'
  },
  {
    label: 'TPA Schedule',
    value: 'TPA Schedule'
  },
  {
    label: 'Orlando Weekly',
    value: 'Orlando Weekly'
  }
]

export const formatDate = (date: string) => {
  const d = dayjs(date).format('MM-DD-YY')
  return d
}

export const colorsToHex = (colorNames: string[]): string[] => {
  const colorMap: Record<any, string> = {
    red: '#FD7972',
    green: '#00FF00',
    blue: '#304FFD',
    yellow: '#FFD240',
    purple: '#800080',
    gray: '#808080',
    orange: '#FF965D',
    pink: '#FFC0CB',
    indigo: '#4B0082'
    // Add more colors as needed
  }

  return colorNames.map((color) => colorMap[color.toLowerCase()] || '')
}

type RuleObject = {
  // Define the RuleObject type as needed
}

export const getRules = (
  name: string,
  type: string,
  required: boolean | undefined,
  message: string | undefined
) => {
  let rules
  if (name === 'email' && type !== 'text') {
    rules = [
      {
        required: required ?? false,
        message: message ?? 'Please enter an email'
      },
      () => ({
        validator(_: RuleObject, val: any) {
          if (!val) {
            return Promise.resolve()
          } else if (emailRegex.test(val)) {
            return Promise.resolve()
          }
          return Promise.reject(new Error('Please enter a valid email'))
        }
      })
    ]
  } else if (name === 'confirmPassword') {
    rules = [
      {
        required: true,
        message: 'Please confirm your password'
      },
      ({ getFieldValue }: any) => ({
        validator(_: RuleObject, val: any) {
          if (!val || getFieldValue('password') === val) {
            return Promise.resolve()
          }
          return Promise.reject(new Error('The two passwords that you entered do not match'))
        }
      })
    ]
  } else if (name === 'currentPassword') {
    rules = [
      {
        required: true,
        message: 'Please enter your current password'
      },
      ({ getFieldValue }: any) => ({
        validator(_: RuleObject, val: any) {
          if (getFieldValue('old') !== val) {
            return Promise.resolve()
          }
          return Promise.reject(new Error('Current password and new password cannot be the same'))
        }
      })
    ]
  } else if (name === 'newPassword') {
    rules = [
      {
        required: true,
        message: 'Please enter a new password'
      },
      ({ getFieldValue }: any) => ({
        validator(_: RuleObject, val: any) {
          if (!val || getFieldValue('currentPassword') !== val) {
            return Promise.resolve()
          }
          return Promise.reject(new Error('Old password and new password cannot be the same'))
        }
      })
    ]
  } else if (name === 'username') {
    rules = [
      {
        required: required ?? false,
        message: message ?? 'Username is required'
      },
      () => ({
        validator(_: RuleObject, val: any) {
          if (!val) {
            return Promise.resolve()
          } else if (usernameRegex.test(val)) {
            return Promise.reject(new Error('No spaces allowed in username'))
          }
          return Promise.resolve()
        }
      })
    ]
  } else if (name === 'phoneNumber') {
    rules = [
      {
        required: required ?? false,
        message: message ?? 'Please enter your phone number'
      }
    ]
  } else if (name === 'password') {
    rules = [
      {
        required: required ?? false,
        message: message ?? 'Password is required'
      },
      () => ({
        validator(_: RuleObject, val: any) {
          if (!val) {
            return Promise.resolve()
          } else if (val.length < 8) {
            return Promise.reject(new Error('Password must be 8 characters long or more'))
          } else if (passwordRegex.test(val) === false) {
            return Promise.reject(
              new Error(
                'Password must contain at least one uppercase, one lowercase, one number and one special character'
              )
            )
          }
          return Promise.resolve()
        }
      })
    ]
  } else {
    rules = [
      {
        required: required ?? false,
        message: message
      }
    ]
  }

  return rules
}
