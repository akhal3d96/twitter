import fetchBacked from '../fetchBackend'

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')

const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (arg, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    if (token) {
      const config = {
        method: 'GET',
        headers: {
          'x-auth-token': token
        }
      }
      try {
        const res = await fetchBacked('api/auth', config)
        const data = await res.json()
        if (res.ok) return data
        return rejectWithValue(data)
      } catch (error) {
        return rejectWithValue(error)
      }
    }

    return rejectWithValue({ errors: ['There\'s no token'] })
  }
)

const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    const config = {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    }
    try {
      const res = await fetchBacked('api/users', config)
      const data = await res.json()
      if (res.ok) return data
      return rejectWithValue(data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    const config = {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }
    try {
      const res = await fetchBacked('api/auth', config)
      const data = await res.json()
      if (res.ok) return data
      return rejectWithValue(data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

function rejectedThunks (state, action) {
  localStorage.removeItem('token')

  state.isAuthenticated = false
  state.loading = false
  state.token = null
  state.user = null
}

function acceptedThunk (state, action) {
  const { payload } = action

  localStorage.setItem('token', payload.token)

  state = Object.assign(state, payload)
  state.isAuthenticated = true
  state.loading = false
}

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export const authSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    logout: rejectedThunks
  },
  extraReducers: {
    [register.fulfilled]: acceptedThunk,
    [register.rejected]: rejectedThunks,
    [login.fulfilled]: acceptedThunk,
    [login.rejected]: rejectedThunks,
    [loadUser.fulfilled]: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = false
    },
    [loadUser.rejected]: rejectedThunks
  }
})

export const { logout } = authSlice.actions
export { register, login, loadUser }
