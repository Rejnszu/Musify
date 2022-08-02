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
      let selectedSong = action.payload.song;
      const newList = selectedPlaylists.map((obj) => {
        if (obj.items.includes)
          return { ...obj, items: [...obj.items, selectedSong] };
      });
      const newListIds = newList.map((item) => item.id);

      const filterOutList = state.playlists.filter(
        (item) => !newListIds.includes(item.id)
      );
      state.playlists = [...filterOutList, ...newList];
    },

    removeSongFromPlaylist(state, action) {
      const songToDelete = action.payload.title;

      const correctPlaylist = state.playlists.filter(
        (playList) => playList.id === action.payload.id
      );

      const newSongsList = correctPlaylist[0].items.filter(
        (song) => song.title !== songToDelete
      );

      correctPlaylist[0].items = [...newSongsList];

      const replacedPlaylist = [...state.playlists].splice(
        action.payload.id,
        1,
        correctPlaylist
      );
    },

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
