import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import watchlistsReducer from '../features/watchlists/watchlistsSlice';
import cryptoReducer from '../features/market/cryptoSlice';
import uiReducer from '../features/ui/uiSlice';
import topNavbarReducer from '../features/nav/topNavbar/topNavbarSlice';
import sideNavReducer from '../features/nav/leftPanel/leftPanelSlice';
import ReusablePanelReducer from '../panels/ReusablePanelSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    watchlists: watchlistsReducer,
    crypto: cryptoReducer,
    ui: uiReducer,
      topNav: topNavbarReducer,
  sideNav: sideNavReducer,
  reusablePanel:  ReusablePanelReducer, // Add the reusable panel reducer
  }
});
