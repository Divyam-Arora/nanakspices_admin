import { createSlice, nanoid } from "@reduxjs/toolkit";
import { randomUUID } from "crypto";

const initialState = {
  error: null,
  loading: false,
  alert: {
    id: null,
    title: "",
    description: "",
  },
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload.error;
    },

    clearError(state) {
      state.error = null;
    },

    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },

    setAlert(state, action) {
      state.alert = {
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
      };
    },

    clearAlert(state) {
      state.alert = {
        id: null,
        title: "",
        description: "",
      };
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice;
