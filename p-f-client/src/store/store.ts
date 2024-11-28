import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/api/auth";
import {userApi } from "@/api/user";
import { authSlice, userSlice } from "@/store/features";
import { createWrapper } from "next-redux-wrapper";

const store = configureStore({
  devTools: true,
  reducer: {
    authReducer: authSlice.reducer,
    userReducer: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware
  ),
});

export type RootStoreType = ReturnType<typeof store.getState>;

export const reduxWrapper = createWrapper(() => store);
export default store;
