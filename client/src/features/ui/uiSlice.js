import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topNav: {
    visible: true,
  },
  sideNav: {
    visible: true,
    collapsed: true,
    items: {
      watchlists: true,
      news: true,
      alerts: true,
      notes: true,
    },
  },
  rightPanel: {
    visible: true,
    collapsed: true,
    width: 300, // default width for resizing
    items: {
      quickActions: true,
      recentAlerts: true,
      marketSummary: true,
      filters: true,
    },
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // VISIBILITY
    toggleTopNav(state) {
      state.topNav.visible = !state.topNav.visible;
    },
    toggleSideNav(state) {
      state.sideNav.visible = !state.sideNav.visible;
    },
    toggleRightPanel(state) {
      state.rightPanel.visible = !state.rightPanel.visible;
    },

    // COLLAPSE STATE
    toggleSideNavCollapse(state) {
      state.sideNav.collapsed = !state.sideNav.collapsed;
    },
    toggleRightPanelCollapse(state) {
      state.rightPanel.collapsed = !state.rightPanel.collapsed;
    },

    // ITEM CONTROL
    setSideNavItem(state, action) {
      const { key, value } = action.payload;
      state.sideNav.items[key] = value;
    },
    setRightPanelItem(state, action) {
      const { key, value } = action.payload;
      state.rightPanel.items[key] = value;
    },

    // WIDTH CONTROL for resizing
    setRightPanelWidth(state, action) {
      const width = action.payload;
      if (width > 100) state.rightPanel.width = width; // minimum width
    },
  },
});

export const {
  toggleTopNav,
  toggleSideNav,
  toggleRightPanel,
  toggleSideNavCollapse,
  toggleRightPanelCollapse,
  setSideNavItem,
  setRightPanelItem,
  setRightPanelWidth, // add this to dispatch resizing
} = uiSlice.actions;

export default uiSlice.reducer;
