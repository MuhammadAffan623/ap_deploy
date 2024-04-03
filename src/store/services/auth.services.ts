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
    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body: body
      })
    }),
    updateProfile: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: body
      })
    }),
    updateProfileSpecificUser: builder.mutation({
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
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/auth/sendEmailForgotPassword`,
        method: 'POST',
        body: body
      })
    }),
    getUserFromToken: builder.mutation({
      query: (token) => ({
        url: `/user/getUserFromToken`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    }),
    getAllUser: builder.mutation({
      query: (params) => ({
        url: '/user',
        method: 'GET',
        params: {
          limit: params.pageSize,
          page: params.current,
          searchText: params.searchText,
          isActive: params.isActive
        }
      })
    }),
    deleteUser: builder.mutation({
      query: (body) => ({
        url: '/user',
        method: 'DELETE',
        body
      })
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useUpdateProfileSpecificUserMutation,
  useUpdatePasswordMutation,
  useGetUserFromTokenMutation,
  useGetAllUserMutation,
  useDeleteUserMutation,
  useResetPasswordMutation
} = authApi
