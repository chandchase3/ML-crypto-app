import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leftPanel: { mode: 'open', width: 300 },         // fully open, opaque by default
  rightPanel: { mode: 'open', width: 300 },       // fully open, opaque by default
  bottomPanel: { mode: 'collapsed', height: 200 }, // collapsed by default
};

const reusablePanelSlice = createSlice({
  name: 'reusablePanel',
  initialState,
  reducers: {
    /**
     * Set the mode of a panel
     * Modes: open, collapsed, hidden, over, overTransparent
     */
    setPanelMode(state, action) {
      const { panel, mode } = action.payload;

      // Ensure 'open' mode is always fully opaque
      if (mode === 'open') {
        state[panel].mode = 'open';
      } else {
        state[panel].mode = mode;
      }
    },

    /**
     * Resize a panel
     * leftPanel/rightPanel => width
     * bottomPanel => height
     */
    resizePanel(state, action) {
      const { panel, size } = action.payload;
      if (panel === 'bottomPanel') {
        state[panel].height = size;
      } else {
        state[panel].width = size;
      }
    },
  },
});

export const { setPanelMode, resizePanel } = reusablePanelSlice.actions;
export default reusablePanelSlice.reducer;
