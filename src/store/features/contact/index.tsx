import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { contactApi } from '~/store/services/contact.services'

interface IContactState {
  contacts: IUser[]
  loading: boolean
}

const initialState: IContactState = {
  contacts: [],
  loading: true
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setcontacts: (state, { payload }: PayloadAction<IUser[]>) => {
      state.contacts = payload
    }
  },

  extraReducers: (builder) => {
    builder.addMatcher(contactApi.endpoints.updateUserById.matchFulfilled, (state, { payload }) => {
      state.contacts = state.contacts.map((item) => {
        if (item._id === payload?.data?.id) {
          return payload.data
        }
        return item
      })
    })
  }
})

export const { setcontacts } = contactsSlice.actions
