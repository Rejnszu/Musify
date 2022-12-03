import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const currentUserApiSlice = createApi({
  reducerPath: "currentUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://musify-98a44-default-rtdb.firebaseio.com/activeUsers/`,
  }),
  endpoints: (builder) => ({
    createCurrentUser: builder.mutation({
      query: (currentUser) => ({
        url: `${currentUser.userName}.json`,
        method: "PUT",
        body: currentUser,
      }),
    }),
    deleteCurrentUser: builder.mutation({
      query: (currentUser) => ({
        url: `${currentUser.userName}.json`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateCurrentUserMutation, useDeleteCurrentUserMutation } =
  currentUserApiSlice;
