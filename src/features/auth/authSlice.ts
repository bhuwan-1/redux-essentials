import { client } from '@/api/client'
import { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  username: string | null
}

export const login = createAppAsyncThunk('users/login', async (username: string) => {
  await client.post('/fakeApi/login', { username })
  return username
})

export const logout = createAppAsyncThunk('user/logout', async () => {
  await client.post('/fakeApi/logout', {})
})

const initialState: AuthState = {
  username: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = null
      })
  },
})

export default authSlice.reducer

export const selectCurrentUsername = (state: RootState) => state.auth.username
