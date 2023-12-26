import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'
import { middlewares } from './middlewares'

export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares
})

export type AppDispatch = typeof store.dispatch
