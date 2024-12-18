import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastScrollPos: 0,
  visible: true,
};

const bottomNavSlice = createSlice({
  name: "bottomSlice",
  initialState,
  reducers: {
    onScroll(state, action) {
      if (action.payload.pos > state.lastScrollPos && state.visible)
        state.visible = false;
      if (action.payload.pos < state.lastScrollPos && !state.visible)
        state.visible = true;
      state.lastScrollPos = action.payload.pos;
    },
    changeVisibility(state, action) {
      state.visible = action.payload.visible;
    },
  },
});

export const bottomNavActions = bottomNavSlice.actions;
export default bottomNavSlice;
