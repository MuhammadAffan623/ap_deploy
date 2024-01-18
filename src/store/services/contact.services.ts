import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, prepareHeaders } from './_utils'

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/contact`,
    prepareHeaders
  }),
  tagTypes:['CONTACT'],
  endpoints: (builder) => ({
    updateUserById: builder.mutation({
      query: ({
        id,
        body = {
          name: 'Doe John',
          division: 'Sales Manage'
        }
      }) => ({
        url: `/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags:['CONTACT']
    }),
    createUserById: builder.mutation({
      query: (body: IUser) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags:['CONTACT']
    }),
    getAllContact: builder.query({
      query: ({ search = '', pagination }: { search: string; pagination: IPagination }) => ({
        url: `?page=${pagination.current}&limit=${pagination.pageSize}&searchText=${search}`,
        method: 'GET'
      }),
      providesTags: ["CONTACT"]
    })
  })
})

export const { useUpdateUserByIdMutation, useLazyGetAllContactQuery, useCreateUserByIdMutation } =
  contactApi
