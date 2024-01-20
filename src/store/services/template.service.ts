import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, prepareHeaders } from './_utils'

export const templateApi = createApi({
  reducerPath: 'templateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getTemplates: builder.mutation({
      query: (params) => ({
        url: `/template`,
        method: 'GET',
        params: {
          limit: params.pageSize,
          page: params.current,
          searchText: params.searchText,
          status: params.status
        }
      })
    }),
    createTemplate: builder.mutation({
      query: (body) => ({
        url: `/template`,
        method: 'POST',
        body
      })
    }),
    updateTemplates: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/template/${id}`,
        method: 'PUT',
        body
      })
    }),
    getTemplateById: builder.mutation({
      query: ({ id }) => ({
        url: `/template/${id}`,
        method: 'GET'
      })
    }),
    deleteTemplate: builder.mutation({
      query: (body) => ({
        url: `/template/delete`,
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetTemplatesMutation,
  useCreateTemplateMutation,
  useUpdateTemplatesMutation,
  useGetTemplateByIdMutation,
  useDeleteTemplateMutation
} = templateApi
