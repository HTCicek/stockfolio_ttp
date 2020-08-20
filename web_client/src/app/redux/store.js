import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import purchaseReducer from './purchaseSlice'
import userReducer from './userSlice'
import stockReducer from './stockSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    purchase: purchaseReducer,
    user: userReducer,
    stock: stockReducer
  },
});
