import { createSlice } from '@reduxjs/toolkit'
import { start } from 'repl'

export const counterSlice = createSlice({
  name: 'settings',
  initialState: {
    value: false
  },
  reducers: {
    change: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new

      // immutable state based off those changes
      console.log('State', state.value)
      state.value = !state.value
    },
    changeOut: state => {
      state.value = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { change, changeOut } = counterSlice.actions

export default counterSlice.reducer
