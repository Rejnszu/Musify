import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./musicList";

const store = configureStore({
  reducer: {
    songCards: songsReducer,
  },
});

export default store;
