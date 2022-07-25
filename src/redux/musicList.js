import { createSlice } from "@reduxjs/toolkit";

const initialSongsState = {
  songsList: [
    {
      img: "https://i1.sndcdn.com/artworks-000105604285-me2956-t500x500.jpg",
      title: "Numb",
      author: "Linkin Park",
      album: "Minutes to Midnight",
    },
    {
      img: "https://deathbytroggles.files.wordpress.com/2022/04/r-4407037-1567219126-9335.jpg",
      title: "Lose Yourself",
      author: "EMINEM",
      album: "Lose Yourself",
    },
    {
      img: "https://ecsmedia.pl/c/bad-romance-remixes-b-iext74296175.jpg",
      title: "Bad Romance",
      author: "Lady Gaga",
      album: "Bad Romance",
    },
    {
      img: "https://lastfm.freetls.fastly.net/i/u/770x0/76f24edfa206442286bd5df4cd050d51.jpg",
      title: "Wrecing Ball",
      author: "Miley Cyrus",
      album: "Bangerz",
    },
    {
      img: "https://cdns-images.dzcdn.net/images/cover/d59ba2295d91292a8bcb372bad9d88be/500x500.jpg",
      title: "Call me maybe",
      author: "Carly Rae Jepsen",
      album: "Kiss",
    },
    {
      img: "https://i1.sndcdn.com/artworks-000147977064-e261r7-t500x500.jpg",
      title: "Master of the puppers",
      author: "Metallica",
      album: "Master of the puppets",
    },
    {
      img: "https://lastfm.freetls.fastly.net/i/u/770x0/76f24edfa206442286bd5df4cd050d51.jpg",
      title: "Wrecing Ball",
      author: "Miley Cyrus",
      album: "Bangerz",
    },
    {
      img: "https://cdns-images.dzcdn.net/images/cover/d59ba2295d91292a8bcb372bad9d88be/500x500.jpg",
      title: "Call me maybe",
      author: "Carly Rae Jepsen",
      album: "Kiss",
    },
    {
      img: "https://i1.sndcdn.com/artworks-000147977064-e261r7-t500x500.jpg",
      title: "Master of the puppers",
      author: "Metallica",
      album: "Master of the puppets",
    },
    {
      img: "https://lastfm.freetls.fastly.net/i/u/770x0/76f24edfa206442286bd5df4cd050d51.jpg",
      title: "Wrecing Ball",
      author: "Miley Cyrus",
      album: "Bangerz",
    },
    {
      img: "https://cdns-images.dzcdn.net/images/cover/d59ba2295d91292a8bcb372bad9d88be/500x500.jpg",
      title: "Call me maybe",
      author: "Carly Rae Jepsen",
      album: "Kiss",
    },
    {
      img: "https://i1.sndcdn.com/artworks-000147977064-e261r7-t500x500.jpg",
      title: "Master of the puppers",
      author: "Metallica",
      album: "Master of the puppets",
    },
  ],
};

const songsSlice = createSlice({
  name: "boosts",
  initialState: initialSongsState,
  reducers: {},
});
export const songsActions = songsSlice.actions;
export default songsSlice.reducer;
