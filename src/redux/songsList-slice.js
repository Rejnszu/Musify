import { createSlice } from "@reduxjs/toolkit";

const initialSongsState = {
  songsList: [
    {
      img: "https://i1.sndcdn.com/artworks-000105604285-me2956-t500x500.jpg",
      title: "Numb",
      author: "Linkin Park",
      album: "Minutes to Midnight",
      id: 0,
      genre: "rock",
      mp3Name: "numb",
    },
    {
      img: "https://deathbytroggles.files.wordpress.com/2022/04/r-4407037-1567219126-9335.jpg",
      title: "Lose Yourself",
      author: "EMINEM",
      album: "Lose Yourself",
      id: 1,
      genre: "rap",
      mp3Name: "looseyourself",
    },
    {
      img: "https://ecsmedia.pl/c/bad-romance-remixes-b-iext74296175.jpg",
      title: "Bad Romance",
      author: "Lady Gaga",
      album: "Bad Romance",
      id: 2,
      genre: "pop",
      mp3Name: "pokerface",
    },
    {
      img: "https://lastfm.freetls.fastly.net/i/u/770x0/76f24edfa206442286bd5df4cd050d51.jpg",
      title: "Wrecking Ball",
      author: "Miley Cyrus",
      album: "Bangerz",
      id: 3,
      genre: "pop",
      mp3Name: "wreckingball",
    },
    {
      img: "https://cdns-images.dzcdn.net/images/cover/d59ba2295d91292a8bcb372bad9d88be/500x500.jpg",
      title: "Call me maybe",
      author: "Carly Rae Jepsen",
      album: "Kiss",
      id: 4,
      genre: "pop",
      mp3Name: "callmemaybe",
    },
    {
      img: "https://i1.sndcdn.com/artworks-000147977064-e261r7-t500x500.jpg",
      title: "Master of the puppets",
      author: "Metallica",
      album: "Master of the puppets",
      id: 5,
      genre: "rock",
      mp3Name: "masterofthepuppets",
    },
    {
      img: "https://s3.party.pl/newsy/katy-perry-roar-81141-1_1.jpg",
      title: "Roar",
      author: "Katy Perry",
      album: "Prism",
      id: 6,
      genre: "pop",
      mp3Name: "roar",
    },
    {
      img: "https://image.ceneostatic.pl/data/products/2724310/i-britney-spears-oops-i-did-it-again.jpg",
      title: "Britney Spears Oops!... I Did It Again",
      author: "Britney Spears",
      album: "Britney Spears",
      id: 7,
      genre: "pop",
      mp3Name: "ops",
    },
    {
      img: "https://ecsmedia.pl/c/just-lose-it-w-iext68161847.jpg",
      title: "Just lose it",
      author: "Eminem",
      album: "Encore",
      id: 8,
      genre: "rap",
      mp3Name: "justloseit",
    },
    {
      img: "https://i1.sndcdn.com/artworks-000105604285-me2956-t500x500.jpg",
      title: "Bleed it out",
      author: "Linkin Park",
      album: "Minutes to midnight",
      id: 9,
      genre: "rock",
      mp3Name: "bleeditout",
    },
    {
      img: "https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163",
      title: "Do i wanna know",
      author: "Arctic Monkeys",
      album: "Arctic Monkeys",
      id: 10,
      genre: "rock",
      mp3Name: "doiwannaknow",
    },
    {
      img: "https://i1.sndcdn.com/artworks-000657305371-hg8rbu-t500x500.jpg",
      title: "The bad touch",
      author: "Bloodhound Gang",
      album: "Viva Hits 6",
      id: 11,
      genre: "rap",
      mp3Name: "thebadtouch",
    },
    {
      img: "https://cdn-l-cyberpunk.cdprojektred.com/edgerunners/Cyberpunk-Edgerunners-S1-Poster-en.jpg",
      title: "I really want to stay at your house",
      author: "Rosa Walton & Hallie Coggins",
      album: "Cyberpunk 2077: Radio, Vol. 2",
      id: 12,
      genre: "pop",
      mp3Name: "CYBERPUNK",
    },
  ],
  selectedSong: undefined,

  genreOptions: [
    { value: "all", name: "All" },
    { value: "rock", name: "Rock" },
    { value: "pop", name: "Pop" },
    { value: "rap", name: "Rap" },
    { value: "soul", name: "Soul" },
    { value: "country", name: "Country" },
    { value: "reggae", name: "Reggae" },
    { value: "blues", name: "Blues" },
    { value: "trap", name: "Trap" },
    { value: "elektro", name: "Elektro" },
    { value: "techno", name: "techno" },
    { value: "unknown", name: "Unknown" },
  ],
};

const songsSlice = createSlice({
  name: "songs",
  initialState: initialSongsState,
  reducers: {
    selectSongAddToPlaylist(state, action) {
      state.selectedSong = action.payload;
    },
    addSongToList(state, action) {
      state.songsList = [...state.songsList, action.payload];
    },
    removeSongFromList(state, action) {
      const filterOutSong = state.songsList.filter(
        (song) => song.id !== action.payload
      );
      state.songsList = [...filterOutSong];
    },
    setSongList(state, action) {
      state.songsList = [...action.payload];
    },
    resetSongList(state) {
      state.songsList = initialSongsState.songsList;
    },
  },
});
export const songsActions = songsSlice.actions;
export default songsSlice.reducer;
