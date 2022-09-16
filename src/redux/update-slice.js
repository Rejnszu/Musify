import { createSlice } from "@reduxjs/toolkit";
const initialUpdateState = {
  shouldUpdate: false,
};
const updateSlice = createSlice({
  name: "update",
  initialState: initialUpdateState,
  reducers: {
    shouldNotUpdate(state) {
      state.shouldUpdate = false;
    },
    shouldUpdate(state) {
      state.shouldUpdate = true;
    },
  },
});
export const updateActions = updateSlice.actions;
export default updateSlice.reducer;
