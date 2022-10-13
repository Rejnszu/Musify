import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import songsReducer from "./songsList-slice";
import playlistReducer from "./playlist-slice";
import authReducer from "./auth-slice";
import updateReducer from "./update-slice.js";
import playerReducer from "./player-slice.js";
const store = configureStore({
  reducer: {
    songsList: songsReducer,
    playlist: playlistReducer,
    authentication: authReducer,
    update: updateReducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
