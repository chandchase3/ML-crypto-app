import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import watchlistsReducer from '../features/watchlists/watchlistsSlice';
import cryptoReducer from '../features/marketData/cryptoSlice';
import workspaceReducer from '../workspace/workspaceSlice';
import scannerReducer from '../features/scanner/scannerSlice';
import krakenReducer from '../features/kraken/krakenSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    watchlists: watchlistsReducer,
    crypto: cryptoReducer,
    workspace: workspaceReducer,
    scanner: scannerReducer,
    kraken: krakenReducer,
  }
});
