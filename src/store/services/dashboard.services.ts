import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, prepareHeaders } from './_utils'

export const dashoboardApi = createApi({
  reducerPath: 'dashoboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/dashboard`,
    prepareHeaders
  }),
  tagTypes: ['DASHBOARD'],
  endpoints: (builder) => ({
    contactUserById: builder.query({
      query: () => ({
        url: '/getContacts',
        method: 'GET'
      })
    }),
    activeUserById: builder.query({
      query: () => ({
        url: '/getActiveUsers',
        method: 'GET'
      })
    }),
    countUserById: builder.query({
      query: () => ({
        url: '/getProjects',
        method: 'GET'
      })
    }),
    templeteUserById: builder.query({
      query: () => ({
        url: '/getTemplates',
        method: 'GET'
      })
    }),
    deviceUserById: builder.query({
      query: () => ({
        url: '/getDevices',
        method: 'GET'
      })
    }),
    activeDeviceUserById: builder.query({
      query: () => ({
        url: '/getDeviceActiveStatus',
        method: 'GET'
      })
    }),
    getChartData: builder.mutation({
      query: (params) => ({
        url: '/chartData',
        method: 'GET',
        params
      })
    })
  })
})

export const {
  useContactUserByIdQuery,
  useActiveUserByIdQuery,
  useCountUserByIdQuery,
  useTempleteUserByIdQuery,
  useDeviceUserByIdQuery,
  useActiveDeviceUserByIdQuery,
  useGetChartDataMutation
} = dashoboardApi
