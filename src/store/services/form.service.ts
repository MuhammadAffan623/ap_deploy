import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, prepareHeaders } from './_utils'

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getForms: builder.mutation({
      query: (params) => ({
        url: `/form`,
        method: 'GET',
        params: {
          limit: params.pageSize,
          page: params.current,
          searchText: params.searchText,
          status: params.status
        }
      })
    }),
    createForm: builder.mutation({
      query: (body) => ({
        url: `/form`,
        method: 'POST',
        body
      })
    }),
    updateForm: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/form/${id}`,
        method: 'PUT',
        body
      })
    }),
    getFormByOwner: builder.mutation({
      query: () => ({
        url: `/form/owners/read`,
        method: 'GET'
      })
    }),
    deleteForm: builder.mutation({
      query: (body) => ({
        url: `/form/delete`,
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetFormsMutation,
  useCreateFormMutation,
  useUpdateFormMutation,
  useGetFormByOwnerMutation,
  useDeleteFormMutation
} = formApi
