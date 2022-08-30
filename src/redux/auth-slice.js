import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = {
  isLogged: false,
  users: [],
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    setIsLogged(state) {
      state.isLogged = !state.isLogged;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
