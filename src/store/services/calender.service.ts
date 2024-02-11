import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, prepareHeaders } from './_utils'

export const calenderApi = createApi({
  reducerPath: 'calenderApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  tagTypes: ['calender'],
  endpoints: (builder) => ({
    getAllCalender: builder.query({
      query: () => ({
        url: `/calender`,
        method: 'GET'
      }),
      providesTags: ['calender']
    }),
    createCalender: builder.mutation({
      query: (body) => ({
        url: `/calender`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['calender']
    }),
    updateCalender: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/calender/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['calender']
    }),
    deleteCalender: builder.mutation({
      query: ({ id }) => ({
        url: `/calender/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['calender']
    })
  })
})

export const {
  useGetAllCalenderQuery,
  useCreateCalenderMutation,
  useUpdateCalenderMutation,
  useDeleteCalenderMutation
} = calenderApi
