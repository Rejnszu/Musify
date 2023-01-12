import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_KEY = "b7354f00f3cc7b0c6c6094f2885f11ff";

export const songsApiSlice = createApi({
  reducerPath: "songsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://ws.audioscrobbler.com/2.0/`,
  }),
  endpoints: (builder) => ({
    getTopSongs: builder.query({
      query: (limit) =>
        `?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=${limit}`,
    }),
    getSongsDetails: builder.query({
      query: (arg) => {
        const { artist, name } = arg;
        return {
          url: `?method=track.getInfo&api_key=${API_KEY}&artist=${artist}&track=${name}&format=json`,
        };
      },
    }),
  }),
});

export const { useGetTopSongsQuery, useGetSongsDetailsQuery } = songsApiSlice;
