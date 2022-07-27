import { createSlice } from "@reduxjs/toolkit";
const initialPlaylistState = {
  playlist: [],
};
const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialPlaylistState,
  reducers: {
    addSongToPlaylist(state, action) {
      state.playlist = [...state.playlist, action.payload];
    },
  },
});
export const playlistActions = playlistSlice.actions;
export default playlistSlice.reducer;
