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
        if (obj.items) {
          if (obj.items.includes(selectedSong)) {
            return { ...obj };
          } else {
            return { ...obj, items: [...obj.items, selectedSong] };
          }
        } else {
          obj = { ...obj, items: [] };
          if (obj.items.includes(selectedSong)) {
            return { ...obj };
          } else {
            return { ...obj, items: [...obj.items, selectedSong] };
          }
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

    openModal(state) {
      state.openModal = true;
    },
    closeModal(state) {
      state.openModal = false;
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
