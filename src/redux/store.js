import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import songsReducer from "./songsList-slice";
import playlistReducer from "./playlist-slice";
import authReducer from "./auth-slice";
import updateReducer from "./update-slice";
import playerReducer from "./player-slice";
import userReducer from "./user-slice";
import { dataApiSlice } from "./api/dataApiSlice";
import { currentUserApiSlice } from "./api/currentUserApiSlice";
import { songsApiSlice } from "./api/songsApiSlice";
import { usersApiSlice } from "./api/userDataApiSlice";
const store = configureStore({
  reducer: {
    songsList: songsReducer,
    playlist: playlistReducer,
    authentication: authReducer,
    update: updateReducer,
    player: playerReducer,
    user: userReducer,
    [dataApiSlice.reducerPath]: dataApiSlice.reducer,
    [currentUserApiSlice.reducerPath]: currentUserApiSlice.reducer,
    [songsApiSlice.reducerPath]: songsApiSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      currentUserApiSlice.middleware,
      dataApiSlice.middleware,
      songsApiSlice.middleware,
      usersApiSlice.middleware
    ),
});

export default store;
