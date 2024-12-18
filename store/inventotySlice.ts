import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    category: "all",
    categories: [],
    exactCategories: [],
    trigger: 1,
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload.categories;
      const otherIndex = state.categories.findIndex(
        (v) => v.name.toLowerCase() == "others"
      );
      if (otherIndex != -1)
        state.exactCategories = state.categories.toSpliced(otherIndex, 1);
      else state.exactCategories = state.categories;
    },
    setCategory(state, action) {
      state.category = action.payload.category;
    },
    refresh(state) {
      state.trigger = -state.trigger;
    },
  },
});

export const inventoryActions = inventorySlice.actions;

export default inventorySlice;
