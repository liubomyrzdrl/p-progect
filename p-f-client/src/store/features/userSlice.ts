import { IUser } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface IUserSlice {
  user: IUser | null;
}
const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAction: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserAction } = userSlice.actions;
export default userSlice;
