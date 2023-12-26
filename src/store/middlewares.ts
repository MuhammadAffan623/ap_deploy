import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { authApi } from './services/auth.services'

export const middlewares = (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) => {
  return getDefaultMiddleware().concat(authApi.middleware)
}

export default middlewares
