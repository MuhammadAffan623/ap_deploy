import { createSlice } from '@reduxjs/toolkit'
import { libraryApi } from '~/store/services/library.service'

interface IState {
  categories: string[] | []
}

const initialState: IState = {
  categories: []
}

export const librarySlice = createSlice({
  name: 'librarySlice',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(
      libraryApi?.endpoints?.getAllCategories?.matchFulfilled,
      (state, { payload }) => {
        state.categories = payload.data
      }
    )
  }
})
