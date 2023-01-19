import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./songsList-slice";
import playlistReducer from "./playlist-slice";
import updateReducer from "./update-slice";
import playerReducer from "./player-slice";
import userReducer from "./user-slice";
import { currentUserApiSlice } from "./api/currentUserApiSlice";
import { songsApiSlice } from "./api/songsApiSlice";
import { usersApiSlice } from "./api/userDataApiSlice";
const store = configureStore({
  reducer: {
    songsList: songsReducer,
    playlist: playlistReducer,
    update: updateReducer,
    player: playerReducer,
    user: userReducer,
    [currentUserApiSlice.reducerPath]: currentUserApiSlice.reducer,
    [songsApiSlice.reducerPath]: songsApiSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      currentUserApiSlice.middleware,
      songsApiSlice.middleware,
      usersApiSlice.middleware
    ),
});

export default store;
