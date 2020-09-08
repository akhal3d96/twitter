const { createSlice } = require('@reduxjs/toolkit')

let alertId = 0

export const alertSlice = createSlice({
  name: 'alert',
  initialState: [],
  reducers: {
    setAlert: {
      reducer (state, action) {
        state.push(action.payload)
      },
      prepare (msg, alertType) {
        return { payload: { id: alertId++, msg, alertType } }
      }
    },
    removeAlert: (state, action) => {
      return state.filter(alert => alert.id !== action.payload.id)
    }
  }
})

export const { setAlert, removeAlert } = alertSlice.actions
