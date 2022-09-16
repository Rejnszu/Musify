import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = {
  isLogged: false,
  users: [],
  currentUser: undefined,
  initials: {
    initialFetchMusicList: true,
    initialFetchPlaylists: true,
    initialUpadte: true,
  },
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
    setUsersPlaylists(state, action) {
      let currentUser = state.users.find(
        (user) => user.userName === action.payload.currentUser
      );
      const otherUsers = state.users.filter(
        (user) => user.userName !== action.payload.currentUser
      );

      currentUser = {
        ...currentUser,
        userPlaylists: [...action.payload.playlists],
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
    changeUserPassword(state, action) {
      let currentUser = state.users.find(
        (user) => user.userName === action.payload.currentUserName
      );
      const otherUsers = state.users.filter(
        (user) => user.userName !== action.payload.currentUserName
      );
      currentUser = {
        ...currentUser,
        password: action.payload.password,
        repeatPassword: action.payload.password,
      };
      state.users = [...otherUsers, currentUser];
    },
    deleteAccount(state, action) {
      const otherUsers = state.users.filter(
        (user) => user.uniqueId !== action.payload.uniqueId
      );
      state.users = [...otherUsers];
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
    handlerInitialUpdate(state, action) {
      state.initials = {
        ...state.initials,
        initialUpadte: action.payload,
      };
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
