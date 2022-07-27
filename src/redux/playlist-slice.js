import { createSlice } from "@reduxjs/toolkit";
const initialPlaylistState = {
  playlists: [],
  playlist: [],
};
const playlistSlice = createSlice({
  name: "playlists",
  initialState: initialPlaylistState,
  reducers: {
    addPlaylist(state, action) {
      const newPlaylist = {
        name: action.payload,
        id: state.playlists.length,
        items: [],
      };
      const newPlaylistList = [...state.playlists, newPlaylist];
      state.playlists = newPlaylistList;
    },
    removePlaylist(state, action) {
      state.playlists = state.playlists.filter(
        (playlist) => playlist.id !== action.payload
      );
    },
    addSongToPlaylist(state, action) {
      state.playlist = [...state.playlist, action.payload];
    },
    removeSongFromPlaylist(state, action) {
      state.playlist = state.playlist.filter(
        (song) => song.title !== action.payload
      );
    },
  },
});
export const playlistActions = playlistSlice.actions;
export default playlistSlice.reducer;
