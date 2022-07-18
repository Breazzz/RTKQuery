import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./github/github.api";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware)
});
