import { createSlice } from "@reduxjs/toolkit";
import { tree } from "next/dist/build/templates/app-page";

export const ORDER_FILTER = [
  {
    name: "status",
    value: ["PLACED", "ACCEPTED", "DELIVERED", "CANCELLED"],
  },
  {
    name: "payment",
    value: ["PENDING", "RECEIVED"],
  },
];

export const ORDER_SORT = ["Name", "Products", "Amount", "Date"];

const initialState = {
  meta: {
    currentPage: 1,
    pageCount: 1,
  },
  list: [],
  page: 1,
  filter: Object.fromEntries(ORDER_FILTER.map((f) => [f.name, []])),
  sort: [],
  search: "",
  refresh: false,
  trigger: 1,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setItems(state, action) {
      state.list = action.payload.list;
      state.meta = action.payload.meta;
      state.refresh = false;
    },
    clearItems(state, action) {
      state.list = [];
      state.meta = { currentPage: 1, pageCount: 1 };
    },
    refresh(state) {
      state.filter = initialState.filter;
      // state.list = initialState.list;
      state.meta = initialState.meta;
      state.search = initialState.search;
      state.sort = initialState.sort;
      state.refresh = true;
      state.trigger = -state.trigger;
    },
    reset(state) {
      state.filter = initialState.filter;
      state.list = initialState.list;
      state.meta = initialState.meta;
      state.search = initialState.search;
      state.sort = initialState.sort;
    },
    setFilterAndSort(state, action) {
      state.filter = action.payload.filter;
      state.sort = action.payload.sort;
    },
    clearFilterAndSort(state) {
      state.filter = initialState.filter;
      state.sort = initialState.sort;
    },
    setSearch(state, action) {
      state.search = action.payload.search;
    },
    clearSearch(state) {
      state.search = "";
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
