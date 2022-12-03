import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import songsReducer from "./songsList-slice";
import playlistReducer from "./playlist-slice";
import authReducer from "./auth-slice";
import updateReducer from "./update-slice.js";
import playerReducer from "./player-slice.js";
import { dataApiSlice } from "./api/dataApiSlice";
import { currentUserApiSlice } from "./api/currentUserApiSlice";
const store = configureStore({
  reducer: {
    songsList: songsReducer,
    playlist: playlistReducer,
    authentication: authReducer,
    update: updateReducer,
    player: playerReducer,
    [dataApiSlice.reducerPath]: dataApiSlice.reducer,
    [currentUserApiSlice.reducerPath]: currentUserApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(currentUserApiSlice.middleware, dataApiSlice.middleware),
});

export default store;
