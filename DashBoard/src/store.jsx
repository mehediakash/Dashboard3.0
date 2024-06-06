import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./ReduxSlice/userSlice";

export const store = configureStore({
  reducer: {
    counter: userSlice,
  },
});
