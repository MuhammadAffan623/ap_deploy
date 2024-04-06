import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, prepareHeaders } from './_utils'

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getProjects: builder.mutation({
      query: (params) => ({
        url: `/project`,
        method: 'GET',
        params: {
          limit: params.pageSize,
          page: params.current,
          searchText: params.searchText,
          status: params.status
        }
      })
    }),
    createProject: builder.mutation({
      query: (body) => ({
        url: `/project`,
        method: 'POST',
        body
      })
    }),
    updateProject: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/project/${id}`,
        method: 'PUT',
        body
      })
    }),
    getProjectById: builder.mutation({
      query: ({ id }) => ({
        url: `/project/${id}`,
        method: 'GET'
      })
    }),
    deleteProject: builder.mutation({
      query: (body) => ({
        url: `/project/delete`,
        method: 'POST',
        body
      })
    }),
    deleteProjectSheet: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/project/${id}`,
        method: 'DELETE',
        body
      })
    })
  })
})

export const {
  useGetProjectsMutation,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetProjectByIdMutation,
  useDeleteProjectMutation,
  useDeleteProjectSheetMutation
} = projectApi
