import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import feedReducer from '../features/feedSlice';
import connectionReducer from '../features/connectionSlice';
import requestReducer from '../features/requestSlice';
export default configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer
  }
});
