import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./songsList-slice";
import playlistReducer from "./playlist-slice";
const store = configureStore({
  reducer: {
    songsList: songsReducer,
    playlist: playlistReducer,
  },
});

export default store;
