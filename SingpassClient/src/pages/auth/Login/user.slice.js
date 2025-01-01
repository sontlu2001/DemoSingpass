import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    jwt: "",
    user: {
      id: null,
      username: "",
      email: "",
      confirmed: false,
      blocked: false,
    },
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
