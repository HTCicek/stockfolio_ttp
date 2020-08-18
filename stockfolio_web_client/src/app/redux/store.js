import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import purchaseReducer from './purchaseSlice'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    purchase: purchaseReducer,
    user: userReducer,
  },
});
