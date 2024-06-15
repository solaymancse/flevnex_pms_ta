import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("admin_token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("admin_token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("admin_token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
