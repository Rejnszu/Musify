import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = {
  isLogged: false,
  users: [],
  currentUser: undefined,
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    addNewUser(state, action) {
      state.users = [...state.users, action.payload];
    },
    setUserListOnStart(state, action) {
      state.users = [...action.payload];
    },

    setUsersMusicList(state, action) {
      let currentUser = state.users.find(
        (user) => user.userName === action.payload.currentUser
      );
      const otherUsers = state.users.filter(
        (user) => user.userName !== action.payload.currentUser
      );

      currentUser = {
        ...currentUser,
        musicList: [...action.payload.songsList],
      };

      state.users = [...otherUsers, currentUser];
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    changeUserName(state, action) {
      let currentUser = state.users.find(
        (user) => user.userName === action.payload.currentUserName
      );
      const otherUsers = state.users.filter(
        (user) => user.userName !== action.payload.currentUserName
      );
      currentUser = { ...currentUser, userName: action.payload.newUserName };
      state.users = [...otherUsers, currentUser];
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
