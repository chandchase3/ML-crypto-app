import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import watchlistsReducer from '../features/watchlists/watchlistsSlice';
import cryptoReducer from '../features/market/cryptoSlice';
import uiReducer from '../features/ui/uiSlice';
import topNavbarReducer from '../features/nav/topNavbar/topNavbarSlice';
import sideNavReducer from '../features/nav/leftPanel/leftPanelSlice';
import rightPanelReducer from '../features/nav/rightPanel/rightPanelSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    watchlists: watchlistsReducer,
    crypto: cryptoReducer,
    ui: uiReducer,
      topNav: topNavbarReducer,
  sideNav: sideNavReducer,
  rightPanel: rightPanelReducer
  }
});
