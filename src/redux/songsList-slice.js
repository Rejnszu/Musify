import { createSlice } from "@reduxjs/toolkit";
import { defaultSongsData, defaultGenres } from "../data/songsData";
const initialSongsState = {
  songsList: defaultSongsData,
  selectedSong: undefined,
  genreOptions: defaultGenres,
  songsLayout: { display: "cards", direction: "vertical" },
};

const songsSlice = createSlice({
  name: "songs",
  initialState: initialSongsState,
  reducers: {
    selectSongAddToPlaylist(state, action) {
      state.selectedSong = action.payload;
    },
    addSongToList(state, action) {
      state.songsList = [...state.songsList, action.payload];
    },
    removeSongFromList(state, action) {
      const filterOutSong = state.songsList.filter(
        (song) => song.id !== action.payload
      );
      state.songsList = [...filterOutSong];
    },
    setSongList(state, action) {
      state.songsList = [...action.payload];
    },
    resetSongList(state) {
      state.songsList = initialSongsState.songsList;
    },
    setSongsLayout(state, action) {
      state.songsLayout = { ...action.payload };
    },
  },
});
export const songsActions = songsSlice.actions;
export default songsSlice.reducer;
