import { configureStore } from '@reduxjs/toolkit'
import { alertSlice } from './reducers/alert'
import { authSlice } from './reducers/auth'

const reducer = {
  alert: alertSlice.reducer,
  auth: authSlice.reducer
}

const store = configureStore({ reducer })

export default store
