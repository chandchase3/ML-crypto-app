import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Top & bottom navs
  topNav: { visible: true, height: 50 },       // redux-controlled height
  bottomNav: { visible: true, height: 50 },    // redux-controlled height

  // Side panels
  leftPanel: { visible: true, width: 200, minWidth: 48, maxWidth: 1700 },
  rightPanel: { visible: true, width: 200, minWidth: 48, maxWidth: 1700 },

  // Secondary workspace (bottom panel)
  secondaryPanel: { visible: true, overlay: true, height: 15, minHeight: 25, maxHeight: 3000 },
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    // Nav visibility
    toggleTopNav(state) {
      state.topNav.visible = !state.topNav.visible;
    },
    toggleBottomNav(state) {
      state.bottomNav.visible = !state.bottomNav.visible;
    },

    // Side panel visibility
    toggleLeftPanel(state) {
      state.leftPanel.visible = !state.leftPanel.visible;
    },
    toggleRightPanel(state) {
      state.rightPanel.visible = !state.rightPanel.visible;
    },

    // Side panel resizing
    setLeftPanelWidth(state, action) {
      const w = action.payload;
      state.leftPanel.width = Math.max(state.leftPanel.minWidth, Math.min(w, state.leftPanel.maxWidth));
    },
    setRightPanelWidth(state, action) {
      const w = action.payload;
      state.rightPanel.width = Math.max(state.rightPanel.minWidth, Math.min(w, state.rightPanel.maxWidth));
    },

    // Secondary workspace
    toggleSecondaryVisible(state) {
      state.secondaryPanel.visible = !state.secondaryPanel.visible;
    },
    toggleSecondaryOverlay(state) {
      state.secondaryPanel.overlay = !state.secondaryPanel.overlay;
    },
    setSecondaryHeight(state, action) {
      const h = action.payload;
      state.secondaryPanel.height = Math.max(state.secondaryPanel.minHeight, Math.min(h, state.secondaryPanel.maxHeight));
    },
    resizeSecondaryPanel(state, action) {
      const newHeight = state.secondaryPanel.height + action.payload;
      state.secondaryPanel.height = Math.max(state.secondaryPanel.minHeight, Math.min(newHeight, state.secondaryPanel.maxHeight));
    },
  },
});

export const {
  toggleTopNav,
  toggleBottomNav,
  toggleLeftPanel,
  toggleRightPanel,
  setLeftPanelWidth,
  setRightPanelWidth,
  toggleSecondaryVisible,
  toggleSecondaryOverlay,
  setSecondaryHeight,
  resizeSecondaryPanel,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
