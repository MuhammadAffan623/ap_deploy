import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, prepareHeaders } from './_utils'

export const eventApi = createApi({
  reducerPath: 'eventApi',
  refetchOnMountOrArgChange:true,
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  tagTypes: ['event'],
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: ({ calendarIds }) => ({
        url: `/event/getAllEvents?calendarIds=${calendarIds?.join(', ')}`,
        method: 'GET'
      }),
      

      providesTags: ['event']
    }),
    createEvent: builder.mutation({
      query: (body) => ({
        url: `/event/create`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['event']
    }),
    updateEvent: builder.mutation({
      query: (body) => ({
        url: `/event/update/`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['event']
    }),
    deleteEvent: builder.mutation({
      query: ({ id }) => ({
        url: `/event/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['event']
    })
  })
})

export const {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation
} = eventApi
