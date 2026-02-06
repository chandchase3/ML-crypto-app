import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: true,
  collapsed: true,
  items: {
    quickActions: true,
    recentAlerts: true,
    marketSummary: true,
    filters: true,
  },
};

const rightPanelSlice = createSlice({
  name: 'rightPanel',
  initialState,
  reducers: {
    toggleRightPanel(state) {
      state.visible = !state.visible;
    },
    toggleRightPanelCollapse(state) {
      state.collapsed = !state.collapsed;
    },
    setRightPanelItem(state, action) {
      const { key, value } = action.payload;
      state.items[key] = value;
    },
  },
});

export const { toggleRightPanel, toggleRightPanelCollapse, setRightPanelItem } =
  rightPanelSlice.actions;
export default rightPanelSlice.reducer;
