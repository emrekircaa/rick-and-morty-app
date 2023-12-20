import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./feature/favSlice";

const store = configureStore({
  reducer: {
    fav: favReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDistpach = typeof store.dispatch;
