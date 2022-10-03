import { createSlice } from "@reduxjs/toolkit";
const initialPlayerState = {
  playInterval: undefined,
  songIndex: 0,
  songList: [],

  audio: undefined,
  isPlaying: false,
  isRandomSong: false,
};
const playerSlice = createSlice({
  name: "player",
  initialState: initialPlayerState,
  reducers: {
    changeIsPlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    setAudio(state, action) {
      state.audio = action.payload;
    },
    setPlayInterval(state, action) {
      state.playInterval = action.payload;
    },
    setIsRandomSong(state) {
      state.isRandomSong = !state.isRandomSong;
    },
    setSongIndex(state, action) {
      state.songIndex = action.payload;
    },
    setSongList(state, action) {
      state.songList = action.payload;
    },
  },
});
export const playerActions = playerSlice.actions;
export default playerSlice.reducer;
