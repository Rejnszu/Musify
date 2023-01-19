import { createSlice } from "@reduxjs/toolkit";
const initialUserState = {
  user: {
    userName: undefined,
    password: undefined,
    musicList: [],
    userPlaylists: [],
    uniqueId: undefined,
  },
};
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.user = { ...action.payload };
    },
    changeUserName(state, action) {
      state.user = { ...state.user, userName: action.payload };
    },
    changeUserPassword(state, action) {
      state.user = { ...state.user, password: action.payload };
    },
    setUserMusicList(state, action) {
      state.user = { ...state.user, musicList: action.payload };
    },
    setUserPlaylists(state, action) {
      state.user = { ...state.user, userPlaylists: action.payload };
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
