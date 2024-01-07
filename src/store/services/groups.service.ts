import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, prepareHeaders } from './_utils'

export const groupsApi = createApi({
  reducerPath: 'groupsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getGroups: builder.mutation({
      query: () => ({
        url: `/group`,
        method: 'GET'
      })
    }),
    createGroups: builder.mutation({
      query: (body) => ({
        url: `/group/create`,
        method: 'POST',
        body
      })
    }),
    updateGroup: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/group/${id}`,
        method: 'PUT',
        body
      })
    }),
    getGroupByIdentifier: builder.mutation({
      query: ({ name }) => ({
        url: `/group/${name}`,
        method: 'GET'
      })
    })
  })
})

export const {
  useGetGroupsMutation,
  useCreateGroupsMutation,
  useUpdateGroupMutation,
  useGetGroupByIdentifierMutation
} = groupsApi
