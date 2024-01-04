import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl, prepareHeaders } from './_utils'

export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getFile: builder.mutation({
      query: ({ key, versionId }) => ({
        url: `file/getFile?key=${key}&versionId=${versionId}`,
        method: 'GET'
      })
    }),
    uploadFile: builder.mutation({
      query: ({ type, folderName, ...body }) => ({
        url: `/file?type=${type}&folderName=${folderName}`,
        method: 'GET',
        body: body
      })
    })
  })
})

export const { useGetFileMutation, useUploadFileMutation } = fileApi
