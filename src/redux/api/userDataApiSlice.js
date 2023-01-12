import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { songsActions } from "../songsList-slice";
import { playlistActions } from "../playlist-slice";
import { userActions } from "../user-slice";
export const usersApiSlice = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://musify-98a44-default-rtdb.firebaseio.com/usersList/`,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ".json",
    }),
    getUser: builder.query({
      query: (currentUser) => `${currentUser}.json`,
      async onQueryStarted(currentUser, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userActions.setUser(data));
        } catch (err) {
          console.log(err.message);
        }
      },
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: `${user.userName}.json`,
        method: "PUT",
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: (user) => ({
        url: `${user.userName}.json`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `${user.userName}.json`,
        method: "PUT",
        body: user,
      }),
    }),
    getUserMusicData: builder.query({
      query: (obj) => `${obj.user}.json`,
      async onQueryStarted(obj, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          if (data.musicList) {
            dispatch(songsActions.setSongList(data.musicList));
            dispatch(userActions.setUserMusicList(data.musicList));

            return;
          }

          if (!data.musicList) {
            dispatch(songsActions.resetSongList());

            dispatch(songsActions.setSongList(obj.songsList));
            dispatch(userActions.setUserMusicList(obj.songsList));

            return;
          }
        } catch (err) {
          console.log(err.message);
        }
      },
    }),
    getUserPlaylistData: builder.query({
      query: (obj) => `${obj.user}.json`,
      async onQueryStarted(obj, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (!data.userPlaylists) {
            dispatch(playlistActions.setPlayListsOnStart([]));
            dispatch(userActions.setUserPlaylists([]));
            return;
          }
          if (data.userPlaylists) {
            dispatch(playlistActions.setPlayListsOnStart(data.userPlaylists));
            dispatch(userActions.setUserPlaylists(data.userPlaylists));
            return;
          }
        } catch (err) {
          console.log(err.message);
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserMusicDataQuery,
  useGetUserPlaylistDataQuery,
} = usersApiSlice;
