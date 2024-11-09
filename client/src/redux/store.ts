// store.js
import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice'
import addressReducer from './addressSlice'
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    address : addressReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
