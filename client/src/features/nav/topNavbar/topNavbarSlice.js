import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: true,
};

const topNavbarSlice = createSlice({
  name: 'topNav',
  initialState,
  reducers: {
    toggleTopNav(state) {
      state.visible = !state.visible;
    },
  },
});

export const { toggleTopNav } = topNavbarSlice.actions;
export default topNavbarSlice.reducer;
