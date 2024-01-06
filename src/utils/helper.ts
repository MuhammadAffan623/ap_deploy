import { MenuProps } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import dayjs from 'dayjs'
import { CSSProperties, Key } from 'react'

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
    value: 'formsHub'
  },
  {
    label: 'Calendar',
    value: 'calendar'
  },
  {
    label: 'Contacts',
    value: 'contacts'
  },
  {
    label: 'Library',
    value: 'library'
  },
  {
    label: 'Blueprints Hub',
    value: 'blueprintsHub'
  },
  {
    label: 'Device Management',
    value: 'deviceManagement'
  },
  {
    label: 'User Groups',
    value: 'userGroups'
  },
  {
    label: 'Settings',
    value: 'settings'
  }
]

export const userPermissions: IPermission[] = [
  {
    label: 'Forms Hub',
    value: 'formsHub',
    children: [
      {
        label: 'Form Templates',
        value: 'formTemplates'
      },
      {
        label: 'Forms',
        value: 'form'
      },
      {
        label: 'Public Forms',
        value: 'publicForms'
      },
      {
        label: 'Delivery Activity',
        value: 'deliveryActivity'
      }
    ]
  },
  {
    label: 'Calendar',
    value: 'calendar'
  },
  {
    label: 'Contacts',
    value: 'contacts'
  },
  {
    label: 'Library',
    value: 'library'
  },
  {
    label: 'Blueprints Hub',
    value: 'blueprintsHub',
    children: [
      {
        label: 'Projects',
        value: 'projects'
      }
    ]
  }
]

export const formsHubPermissions: IPermission[] = [
  {
    label: 'Allow export to PDF',
    value: 'allowExportToPdf'
  },
  {
    label: 'Add Tags to forms',
    value: 'addTagsToForms'
  },
  {
    label: 'Rename existing Forms',
    value: 'renameExistingForms'
  },
  {
    label: 'Delete forms',
    value: 'deleteForms'
  },
  {
    label: 'Create copies of forms',
    value: 'createCopiesOfForms'
  },
  {
    label: 'Delete Public Form',
    value: 'deletePublicForms'
  }
]

export const blueprintsHubPermissions: IPermission[] = [
  {
    label: 'Allow export to PDF',
    value: 'allowExportToPdf'
  },
  {
    label: 'Add Tags to projects',
    value: 'addTagsToProjects'
  },
  {
    label: 'Rename existing Projects',
    value: 'renameExistingProjects'
  },
  {
    label: 'Delete Projects',
    value: 'deleteProjects'
  },
  {
    label: 'Email Plans',
    value: 'emailPlans'
  },
  {
    label: 'Delete Annotations',
    value: 'deleteAnnotations'
  },
  {
    label: 'Change Status',
    value: 'changeStatus'
  }
]

export const calendarPermissions: IPermission[] = [
  {
    label: 'Lining Schedule',
    value: 'liningSchedule'
  },
  {
    label: 'Jax Schedule',
    value: 'jaxSchedule'
  },
  {
    label: 'TPA Schedule',
    value: 'tpaSchedule'
  },
  {
    label: 'Orlando Weekly',
    value: 'orlandoWeekly'
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

type RulesArray = Array<
  | {
      required: boolean
      message: string
    }
  | {
      validator: (_: RuleObject, val: any, context?: any) => Promise<void>
    }
>

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
