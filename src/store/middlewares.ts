import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { authApi } from './services/auth.services'
import { fileApi } from './services/file.services'
import { groupsApi } from './services/groups.service'

export const middlewares = (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) => {
  return getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(fileApi.middleware)
    .concat(groupsApi.middleware)
}

export default middlewares
