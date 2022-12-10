import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authActions } from "../auth-slice";
import { songsActions } from "../songsList-slice";
import { playlistActions } from "../playlist-slice";

export const dataApiSlice = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://musify-98a44-default-rtdb.firebaseio.com/",
  }),
  endpoints: (builder) => ({
    getUsersData: builder.query({
      query: () => "users.json",
      async onQueryStarted(undefined, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(authActions.setUserListOnStart(data));
        } catch (err) {
          console.log(err.message);
        }
      },
    }),
    getMusicData: builder.query({
      query: (arg) => "users.json",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const currentUserMusicList = data.find(
            (user) => user.userName === arg.currentUser
          ).musicList;

          if (currentUserMusicList) {
            dispatch(songsActions.setSongList(currentUserMusicList));

            return;
          }

          if (!currentUserMusicList) {
            dispatch(songsActions.resetSongList());

            dispatch(songsActions.setSongList(arg.songsList));

            return;
          }
        } catch (err) {
          console.log(err.message);
        }
      },
    }),
    getPlaylistData: builder.query({
      query: (arg) => "users.json",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const currentUserPlaylists = data.find(
            (user) => user.userName === arg.currentUser
          ).userPlaylists;

          if (!currentUserPlaylists) {
            dispatch(playlistActions.setPlayListsOnStart([]));
            return;
          }
          if (currentUserPlaylists) {
            dispatch(playlistActions.setPlayListsOnStart(currentUserPlaylists));
            return;
          }
        } catch (err) {
          console.log(err.message);
        }
      },
    }),
    updateData: builder.mutation({
      query: (users) => ({ url: "users.json", method: "PUT", body: users }),
    }),
  }),
});

export const {
  useGetUsersDataQuery,
  useGetMusicDataQuery,
  useGetPlaylistDataQuery,
  useUpdateDataMutation,
} = dataApiSlice;
