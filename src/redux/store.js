import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./songsList-slice";
import playlistReducer from "./playlist-slice";
import authReducer from "./auth-slice";
const store = configureStore({
  reducer: {
    songsList: songsReducer,
    playlist: playlistReducer,
    authentication: authReducer,
  },
});

export default store;
