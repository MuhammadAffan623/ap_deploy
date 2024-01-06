import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { authApi } from './services/auth.services'
import { fileApi } from './services/file.services'

export const middlewares = (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) => {
  return getDefaultMiddleware().concat(authApi.middleware).concat(fileApi.middleware)
}

export default middlewares
