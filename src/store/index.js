import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    auth: authReducer,
  },
}); 