import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    topNav: { visible: true, height: 50 },
  bottomNav: { visible: true, height: 50 },
  // Side panels
  leftPanel: { type: 'simple', visible: true, width: 200, minWidth: 48, maxWidth: 1700 },
  rightPanel: { type: 'simple', visible: true, width: 200, minWidth: 48, maxWidth: 1700 },

  // Secondary workspace (default overlay)
  secondaryPanel: { visible: true, overlay: true, height: 200, minHeight: 25, maxHeight: 3000 },
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    // Side panels
    toggleLeftPanel(state) { state.leftPanel.visible = !state.leftPanel.visible; },
    toggleRightPanel(state) { state.rightPanel.visible = !state.rightPanel.visible; },
    setLeftPanelWidth(state, action) {
      const w = action.payload;
      state.leftPanel.width = Math.max(state.leftPanel.minWidth, Math.min(w, state.leftPanel.maxWidth));
    },
    setRightPanelWidth(state, action) {
      const w = action.payload;
      state.rightPanel.width = Math.max(state.rightPanel.minWidth, Math.min(w, state.rightPanel.maxWidth));
    },

    // Secondary panel
    setSecondaryHeight(state, action) {
      const h = action.payload;
      state.secondaryPanel.height = Math.max(state.secondaryPanel.minHeight, Math.min(h, state.secondaryPanel.maxHeight));
    },
    toggleSecondaryVisible(state) {
      state.secondaryPanel.visible = !state.secondaryPanel.visible;
    },
  },
});

export const { toggleLeftPanel, toggleRightPanel, setLeftPanelWidth, setRightPanelWidth, setSecondaryHeight, toggleSecondaryVisible } = workspaceSlice.actions;
export default workspaceSlice.reducer;
