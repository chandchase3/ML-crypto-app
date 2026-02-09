import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import watchlistsReducer from '../features/watchlists/watchlistsSlice';
import cryptoReducer from '../features/marketData/cryptoSlice';
import workspaceReducer from '../workspace/workspaceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    watchlists: watchlistsReducer,
    crypto: cryptoReducer,
    workspace: workspaceReducer,
  }
});
