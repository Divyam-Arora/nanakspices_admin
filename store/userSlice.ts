import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
    },
    clearToken(state, action) {
      state.token = null;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
