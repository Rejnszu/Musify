import { createSlice } from "@reduxjs/toolkit";
const initialPlaylistState = {
  playlists: [],
};
const playlistSlice = createSlice({
  name: "playlists",
  initialState: initialPlaylistState,
  reducers: {
    addPlaylist(state, action) {
      const newPlaylist = {
        name: action.payload,
        id: Date.now() + Math.floor(Math.random() * 1000) + 1,
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
        if (obj.items) {
          return { ...obj, items: [...obj.items, selectedSong] };
        } else {
          obj = { ...obj, items: [] };
          return { ...obj, items: [...obj.items, selectedSong] };
        }
      });
      const newListIds = newList.map((item) => item.id);

      const filterOutList = state.playlists.filter(
        (item) => !newListIds.includes(item.id)
      );
      state.playlists = [...filterOutList, ...newList];
    },

    removeSongFromPlaylist(state, action) {
      const songToDeleteId = action.payload.itemId;

      let playlistToDeleteSong = state.playlists.find((playlist) => {
        return playlist.id === action.payload.playlistId;
      });

      const newSongsList = playlistToDeleteSong.items.filter((song) => {
        return song.id !== songToDeleteId;
      });

      playlistToDeleteSong = {
        ...playlistToDeleteSong,
        items: newSongsList.length === 0 ? [] : [...newSongsList],
      };

      state.playlists = state.playlists.map((playlist) =>
        playlist.id === action.payload.playlistId
          ? playlistToDeleteSong
          : playlist
      );
    },

    setPlayListsOnStart(state, action) {
      state.playlists = [...action.payload];
    },
    resetPlaylists(state) {
      state.playlists = initialPlaylistState.playlists;
    },
  },
});
export const playlistActions = playlistSlice.actions;
export default playlistSlice.reducer;
