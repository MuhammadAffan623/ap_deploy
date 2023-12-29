import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, prepareHeaders } from './_utils'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: ILoginBody) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    updateProfile: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: body
      })
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: `/user/changePassword`,
        method: 'POST',
        body: body
      })
    })
  })
})

export const { useLoginMutation, useUpdateProfileMutation, useUpdatePasswordMutation } = authApi
