import { createSlice } from "@reduxjs/toolkit";
const initialPlayerState = {
  songIndex: 0,
  playInterval: undefined,
  songList: undefined,
  audio: undefined,
  isPlaying: false,
  isRandomSong: false,
  currentSong: undefined,
  initialPlayerLoad: true,
  initialPlayerSelectLoad: true,
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
    increaseSongIndex(state) {
      state.songIndex += 1;
    },
    reduceSongIndex(state) {
      state.songIndex -= 1;
    },
    setSongList(state, action) {
      state.songList = action.payload;
    },
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
    },
    playerReset() {
      return initialPlayerState;
    },
    playerSelectInitialLoadHandler(state, action) {
      state.initialPlayerSelectLoad = action.payload;
    },
    playerInitialLoadHandler(state, action) {
      state.initialPlayerLoad = action.payload;
    },
  },
});
export const playerActions = playerSlice.actions;
export default playerSlice.reducer;
