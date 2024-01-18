import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// import { getUsercontacts } from '~/services/usercontacts.services'
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
    builder.addMatcher(contactApi.endpoints.getAllContact.matchFulfilled, (state, { payload }) => {
    }),
      builder.addMatcher(
        contactApi.endpoints.updateUserById.matchFulfilled,
        (state, { payload }) => {
          state.contacts = state.contacts.map((item) => {
            if (item._id === payload?.data?.id) {
              return payload.data
            }
            return item
          })
        }
      )
  }
})

export const { setcontacts } = contactsSlice.actions
