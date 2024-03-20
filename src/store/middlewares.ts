import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { authApi } from './services/auth.services'
import { contactApi } from './services/contact.services'
import { fileApi } from './services/file.services'
import { groupsApi } from './services/groups.service'
import { libraryApi } from './services/library.service'
import { formApi } from './services/form.service'
import { templateApi } from './services/template.service'
import { projectApi } from './services/project.service'
import { calenderApi } from './services/calender.service'
import { eventApi } from './services/event.service'
import { dashoboardApi } from './services/dashboard.services'
import { deviceApi } from './services/deveice.service'

export const middlewares = (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) => {
  return getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(contactApi.middleware)
    .concat(fileApi.middleware)
    .concat(groupsApi.middleware)
    .concat(libraryApi.middleware)
    .concat(formApi.middleware)
    .concat(templateApi.middleware)
    .concat(projectApi.middleware)
    .concat(calenderApi.middleware)
    .concat(eventApi.middleware)
    .concat(dashoboardApi.middleware)
    .concat(deviceApi.middleware)
}

export default middlewares
