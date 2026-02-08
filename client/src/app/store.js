import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/user/auth/authSlice';
import watchlistsReducer from '../features/watchlists/watchlistsSlice';
import cryptoReducer from '../features/market/cryptoSlice';
import workspaceReducer from '../layouts/redux/workspaceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    watchlists: watchlistsReducer,
    crypto: cryptoReducer,
    workspace: workspaceReducer,
  }
});
