import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setAuthStateAction: (state, action) => {
      state.isAuth = action.payload;
    },
    authLogoutAction: (state) => {
      localStorage.removeItem("token");
      state.isAuth = false;
    },
  },
});

export const { setAuthStateAction, authLogoutAction } = authSlice.actions;
export default authSlice;
