import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import feedReducer from '../features/feedSlice'
export default configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,


  }
})