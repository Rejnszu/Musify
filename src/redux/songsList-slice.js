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
      title: "Wrecking Ball",
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
      title: "Master of the puppets",
      author: "Metallica",
      album: "Master of the puppets",
    },
    {
      img: "https://s3.party.pl/newsy/katy-perry-roar-81141-1_1.jpg",
      title: "Roar",
      author: "Katy Perry",
      album: "Prism",
    },
    {
      img: "https://image.ceneostatic.pl/data/products/2724310/i-britney-spears-oops-i-did-it-again.jpg",
      title: "Britney Spears Oops!... I Did It Again",
      author: "Britney Spears",
      album: "Britney Spears",
    },
    {
      img: "https://ecsmedia.pl/c/encore-b-iext104790646.jpg",
      title: "Just lose it",
      author: "Eminem",
      album: "Encore",
    },
    {
      img: "https://i1.sndcdn.com/artworks-000105604285-me2956-t500x500.jpg",
      title: "Bleed it out",
      author: "Linkin Park",
      album: "Minutes to midnight",
    },
    {
      img: "https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163",
      title: "Do i wanna know",
      author: "Arctic Monkeys",
      album: "Arctic Monkeys",
    },
    {
      img: "https://i1.sndcdn.com/artworks-000657305371-hg8rbu-t500x500.jpg",
      title: "The bad touch",
      author: "Bloodhound Gang",
      album: "Viva Hits 6",
    },
  ],
};

const songsSlice = createSlice({
  name: "songs",
  initialState: initialSongsState,
  reducers: {},
});
export const songsActions = songsSlice.actions;
export default songsSlice.reducer;
