import { MenuProps } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import moment from 'moment'
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
  ...Array.from({ length: moment().year() - 1970 + 1 }, (_, i) => {
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

export const formatDate = (date: string) => {
  const d = moment(date).format('MM-DD-YY')
  return d
}
