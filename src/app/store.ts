import { configureStore } from '@reduxjs/toolkit'

import postReducer from '../features/posts/postSlice'
import userReducer from '../features/users/userSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    auth: authReducer,
  },
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
