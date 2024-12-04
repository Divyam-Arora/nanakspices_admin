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

export const PAGE_DATA = {
  order: {
    filter: [
      {
        name: "status",
        value: ["PLACED", "ACCEPTED", "DELIVERED", "CANCELLED"],
      },
      {
        name: "payment",
        value: ["PENDING", "RECEIVED"],
      },
    ],
    sort: ["Name", "Products", "Amount", "Date"],
  },
  inventory: {
    filter: [],
    sort: ["Name", "Availability"],
  },
  customer: {
    filter: [],
    sort: ["Name"],
  },
};

type InitialState = {
  [key in keyof typeof PAGE_DATA]: {
    meta: {
      currentPage: number;
      pageCount: number;
      any;
    };
    list: any[];
    page: number;
    filter: {
      string: [];
    };
    sort: [];
    search: string;
    refresh: boolean;
    trigger: number;
  };
};

const initialState: InitialState = Object.fromEntries(
  Object.entries(PAGE_DATA).map((kv) => [
    kv[0],
    {
      meta: {
        currentPage: 1,
        pageCount: 0,
      },
      list: [],
      page: 1,
      filter: {},
      sort: [],
      search: "",
      refresh: false,
      trigger: 1,
    },
  ])
) as InitialState;

console.log(initialState);

const pageSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setItems(state, action) {
      state[action.payload.type].list = action.payload.list;
      state[action.payload.type].meta = action.payload.meta;
      state[action.payload.type].refresh = false;
    },
    clearItems(state, action) {
      state[action.payload.type].list = [];
      state[action.payload.type].meta = { currentPage: 1, pageCount: 1 };
    },
    refresh(state, action) {
      state[action.payload.type].filter =
        initialState[action.payload.type].filter;
      // state.list = initialState.list;
      state[action.payload.type].meta = initialState[action.payload.type].meta;
      state[action.payload.type].search =
        initialState[action.payload.type].search;
      state[action.payload.type].sort = initialState[action.payload.type].sort;
      state[action.payload.type].refresh = true;
      state[action.payload.type].trigger = -state[action.payload.type].trigger;
    },
    reset(state, action: { payload: any; type: keyof typeof initialState }) {
      state[action.payload.type].filter =
        initialState[action.payload.type].filter;
      state[action.payload.type].list = initialState[action.payload.type].list;
      state[action.payload.type].meta = initialState[action.payload.type].meta;
      state[action.payload.type].search =
        initialState[action.payload.type].search;
      state[action.payload.type].sort = initialState[action.payload.type].sort;
    },
    setFilterAndSort(state, action) {
      state[action.payload.type].filter = action.payload.filter;
      state[action.payload.type].sort = action.payload.sort;
    },
    clearFilterAndSort(state, action) {
      state[action.payload.type].filter = initialState[action.type].filter;
      state[action.payload.type].sort = initialState[action.type].sort;
    },
    setSearch(state, action) {
      state[action.payload.type].search = action.payload.search;
    },
    clearSearch(state, action) {
      state[action.payload.type].search = "";
    },
  },
});

export const pageActions = pageSlice.actions;

export default pageSlice;
