import { createSlice } from "@reduxjs/toolkit";
const initialUpdateState = {
  shouldUpdate: false,
  initials: {
    initialFetchMusicList: true,
    initialFetchPlaylists: true,
  },
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
    handleInitialFetchMusicList(state, action) {
      state.initials = {
        ...state.initials,
        initialFetchMusicList: action.payload,
      };
    },
    handleInitialFetchPlaylists(state, action) {
      state.initials = {
        ...state.initials,
        initialFetchPlaylists: action.payload,
      };
    },
  },
});
export const updateActions = updateSlice.actions;
export default updateSlice.reducer;
