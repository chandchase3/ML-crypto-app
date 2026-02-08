import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Top & bottom navs
  topNav: { visible: true, height: 50 },
  bottomNav: { visible: true, height: 50 },

  // Side panels with resizable sections
  leftPanel: { 
    visible: true, 
    width: 200, 
    minWidth: 48, 
    maxWidth: 1700,
    sections: {
      watchlist: { height: 150, minHeight: 50, grow: 1, collapsed: false, maximized: false },
      scanner: { height: 200, minHeight: 50, grow: 1, collapsed: false, maximized: false },
      alerts: { height: 100, minHeight: 50, grow: 1, collapsed: false, maximized: false },
      settings: { height: 100, minHeight: 50, grow: 1, collapsed: false, maximized: false },
    }
  },
  rightPanel: { 
    visible: true, 
    width: 200, 
    minWidth: 48, 
    maxWidth: 1700,
    sections: {
      news: { height: 150, minHeight: 50, grow: 1, collapsed: false, maximized: false },
      trades: { height: 200, minHeight: 50, grow: 2, collapsed: false, maximized: false },
    }
  },

  // Secondary workspace
  secondaryPanel: { visible: true, overlay: true, height: 15, minHeight: 25, maxHeight: 3000 },
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    // Navs
    toggleTopNav(state) { state.topNav.visible = !state.topNav.visible; },
    toggleBottomNav(state) { state.bottomNav.visible = !state.bottomNav.visible; },
    setTopNavHeight(state, action) { state.topNav.height = action.payload; },
    setBottomNavHeight(state, action) { state.bottomNav.height = action.payload; },

    // Panels
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
    toggleSecondaryVisible(state) { state.secondaryPanel.visible = !state.secondaryPanel.visible; },
    toggleSecondaryOverlay(state) { state.secondaryPanel.overlay = !state.secondaryPanel.overlay; },
    setSecondaryHeight(state, action) {
      const h = action.payload;
      state.secondaryPanel.height = Math.max(state.secondaryPanel.minHeight, Math.min(h, state.secondaryPanel.maxHeight));
    },
    resizeSecondaryPanel(state, action) {
      const newHeight = state.secondaryPanel.height + action.payload;
      state.secondaryPanel.height = Math.max(state.secondaryPanel.minHeight, Math.min(newHeight, state.secondaryPanel.maxHeight));
    },

    // Panel sections
    adjustSectionGrow(state, action) {
      const { panel, topId, bottomId, topHeight, bottomHeight } = action.payload;
      const top = state[panel].sections[topId];
      const bottom = state[panel].sections[bottomId];
      top.height = topHeight;
      bottom.height = bottomHeight;
    },
    adjustSectionHeight(state, action) {
      const { panel, topId, bottomId, topHeight, bottomHeight } = action.payload;
      state[panel].sections[topId].height = topHeight;
      state[panel].sections[bottomId].height = bottomHeight;
    },
        
    toggleSectionCollapse(state, action) {
      const { panel, id } = action.payload;
      state[panel].sections[id].collapsed = !state[panel].sections[id].collapsed;
    },
    toggleSectionMaximize(state, action) {
      const { panel, id } = action.payload;
      const section = state[panel].sections[id];
      section.maximized = !section.maximized;

      Object.keys(state[panel].sections).forEach(key => {
        if (key !== id) state[panel].sections[key].maximized = false;
      });
    },
  },
});

export const {
  toggleTopNav, toggleBottomNav, setTopNavHeight, setBottomNavHeight,
  toggleLeftPanel, toggleRightPanel, setLeftPanelWidth, setRightPanelWidth,
  toggleSecondaryVisible, toggleSecondaryOverlay, setSecondaryHeight, resizeSecondaryPanel,
  adjustSectionGrow, toggleSectionCollapse, toggleSectionMaximize, adjustSectionHeight
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
