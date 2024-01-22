import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { authApi } from './services/auth.services'
import { contactApi } from './services/contact.services'
import { fileApi } from './services/file.services'
import { groupsApi } from './services/groups.service'
import { libraryApi } from './services/library.service'
import { formApi } from './services/form.service'
import { templateApi } from './services/template.service'
import { projectApi } from './services/project.service'

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
}

export default middlewares
