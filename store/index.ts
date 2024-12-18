import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import appSlice from "./appSlice";
import orderSlice from "./orderSlice";
import pageSlice from "./pageSlice";
import inventorySlice from "./inventotySlice";
import bottomNavSlice from "./bottomNavSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    app: appSlice.reducer,
    order: orderSlice.reducer,
    page: pageSlice.reducer,
    inventory: inventorySlice.reducer,
    bottomNav: bottomNavSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
