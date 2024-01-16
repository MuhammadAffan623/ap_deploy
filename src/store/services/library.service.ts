import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, prepareHeaders } from './_utils'

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getLibraries: builder.mutation({
      query: (params) => ({
        url: `/library`,
        method: 'GET',
        params: {
          limit: params.pageSize,
          page: params.current,
          searchText: params.searchText,
          isActive: params.isActive
        }
      })
    }),
    createLibrary: builder.mutation({
      query: (body) => ({
        url: `/library`,
        method: 'POST',
        body
      })
    }),
    updateLibrary: builder.mutation({
      query: (body) => ({
        url: `/library/update`,
        method: 'POST',
        body
      })
    }),
    getLibraryById: builder.mutation({
      query: ({ id }) => ({
        url: `/library/find-library/${id}`,
        method: 'GET'
      })
    }),
    deleteLibrary: builder.mutation({
      query: (body) => ({
        url: `/library/delete`,
        method: 'POST',
        body
      })
    }),
    getAllCategories: builder.mutation({
      query: () => ({
        url: `/library/list/categories`,
        method: 'GET'
      })
    })
  })
})

export const {
  useGetLibrariesMutation,
  useCreateLibraryMutation,
  useUpdateLibraryMutation,
  useGetLibraryByIdMutation,
  useGetAllCategoriesMutation,
  useDeleteLibraryMutation,
} = libraryApi
