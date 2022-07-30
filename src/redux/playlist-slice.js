import { createSlice } from "@reduxjs/toolkit";
const initialPlaylistState = {
  playlists: [],
  openModal: false,
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
      let selectedPlaylists = [...action.payload.playlists];

      const newList = selectedPlaylists.map((obj) => {
        return { ...obj, items: [...obj.items, action.payload.song] };
      });
      console.log(newList);
      console.log(state.playlists);
    },
    // addSongToPlaylist(state, action) {
    //   state.playlist = [...state.playlist, action.payload];
    // },
    // removeSongFromPlaylist(state, action) {
    //   state.playlist = state.playlist.filter(
    //     (song) => song.title !== action.payload
    //   );
    // },
    openModal(state) {
      state.openModal = true;
    },
    closeModal(state) {
      state.openModal = false;
    },
  },
});
export const playlistActions = playlistSlice.actions;
export default playlistSlice.reducer;
