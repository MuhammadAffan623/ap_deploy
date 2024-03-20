import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, prepareHeaders } from './_utils'

export const deviceApi = createApi({
  reducerPath: 'deviceApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  tagTypes: ['device'],
  endpoints: (builder) => ({
    getAllDevices: builder.mutation({
      query: (params) => ({
        url: `/device`,
        method: 'GET',
        params: {
          limit: params.pageSize,
          page: params.current,
          searchText: params.searchText,
          healthCheck: params.healthCheck
        }
      })
      // providesTags: ['device']
    }),

    deleteDevice: builder.mutation({
      query: ({ deviceIds }) => ({
        url: `/device/delete`,
        method: 'DELETE',
        body: deviceIds
      }),
      invalidatesTags: ['device']
    })
  })
})

export const { useGetAllDevicesMutation, useDeleteDeviceMutation } = deviceApi
