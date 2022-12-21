import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import songsReducer from "./songsList-slice";
import playlistReducer from "./playlist-slice";
import authReducer from "./auth-slice";
import updateReducer from "./update-slice.js";
import playerReducer from "./player-slice.js";
import { dataApiSlice } from "./api/dataApiSlice";
import { currentUserApiSlice } from "./api/currentUserApiSlice";
import { songsApiSlice } from "./api/songsApi";
const store = configureStore({
  reducer: {
    songsList: songsReducer,
    playlist: playlistReducer,
    authentication: authReducer,
    update: updateReducer,
    player: playerReducer,
    [dataApiSlice.reducerPath]: dataApiSlice.reducer,
    [currentUserApiSlice.reducerPath]: currentUserApiSlice.reducer,
    [songsApiSlice.reducerPath]: songsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      currentUserApiSlice.middleware,
      dataApiSlice.middleware,
      songsApiSlice.middleware
    ),
});

export default store;
