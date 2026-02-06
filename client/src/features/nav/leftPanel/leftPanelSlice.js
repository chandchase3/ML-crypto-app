import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: true,
  collapsed: true,
  items: {
    watchlists: true,
    news: true,
    alerts: true,
    notes: true,
  },
};

const leftPanelSlice = createSlice({
  name: 'sideNav',
  initialState,
  reducers: {
    toggleSideNav(state) {
      state.visible = !state.visible;
    },
    toggleSideNavCollapse(state) {
      state.collapsed = !state.collapsed;
    },
    setSideNavItem(state, action) {
      const { key, value } = action.payload;
      state.items[key] = value;
    },
  },
});

export const { toggleSideNav, toggleSideNavCollapse, setSideNavItem } =
  leftPanelSlice.actions;
export default leftPanelSlice.reducer;
