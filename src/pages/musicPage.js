import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { authActions } from "../redux/auth-slice";

import CardListOverlay from "../components/UI/CardListOverlay";
import MusicCard from "../components/MusicCard/MusicCard";
import Hello from "../components/UI/Hello";
import EmptyList from "../components/UI/EmptyList";
import MusicListItem from "../components/MusicList/MusicListItem";
import AnimatedPages from "../components/UI/AnimatedPages";
import Button from "../components/UI/Button";
import AddSong from "../components/MusicCard/AddSong";
import ItemsListOverlay from "../components/UI/ItemsListOverlay";
import { fetchMusicData } from "../redux/Actions/musicActions";
import { fetchPlaylists } from "../redux/Actions/playlistActions";
import ChooseFilters from "../components/FilterMusic/ChooseFilters";
import ChangeSongsDisplay from "../components/UI/ChangeSongsDisplay";
const MusicPage = () => {
  const dispatch = useDispatch();
  const songsList = useSelector((state) => state.songsList.songsList);
  const playlists = useSelector((state) => state.playlist.playlists);
  const currentUser = sessionStorage.getItem("currentUser");
  const loadingStatus = useSelector((state) => state.songsList.loadingStatus);
  const [filteredSongs, setFilteredSongs] = useState(songsList);
  const [openAddSong, setOpenAddSong] = useState(false);
  const [display, setDisplay] = useState("cards");

  const setDisplayToList = () => {
    setDisplay("list");
  };
  const setDisplayToCards = () => {
    setDisplay("cards");
  };
  function openNewSongCreator() {
    setOpenAddSong(true);
  }
  function closeNewSongCreator() {
    setOpenAddSong(false);
  }
  const isEmpty = filteredSongs.length === 0;

  function filterSongsByName(value) {
    if (value.trim().length === 0) {
      setFilteredSongs(songsList);
    } else {
      setFilteredSongs(
        songsList.filter(
          (song) =>
            song.title.toLowerCase().includes(value) ||
            song.author.toLowerCase().includes(value) ||
            song.album.toLowerCase().includes(value)
        )
      );
    }
  }
  function filterSongsByGenre(value) {
    if (value === "all") {
      setFilteredSongs(songsList);
    } else
      setFilteredSongs(
        songsList.filter((song) => song.genre.toLowerCase() === value)
      );
  }

  useEffect(() => {
    dispatch(fetchMusicData(currentUser, songsList));

    dispatch(fetchPlaylists(currentUser, playlists));
  }, [dispatch, currentUser]);

  useEffect(() => {
    dispatch(
      authActions.setUsersMusicList({
        currentUser,
        songsList,
      })
    );
  }, [songsList, dispatch, currentUser]);
  useEffect(() => {
    dispatch(
      authActions.setUsersPlaylists({
        currentUser,
        playlists,
      })
    );
  }, [playlists, dispatch, currentUser]);
  useEffect(() => {
    setFilteredSongs(songsList);
  }, [songsList]);

  // function convertBlob(img) {
  //   if (img instanceof Blob) {
  //     let bufferBase64 = new Buffer(img, "binary").toString("base64");
  //     return img + bufferBase64;
  //   } else {
  //     return img;
  //   }
  // }

  return (
    <AnimatedPages>
      <ChangeSongsDisplay
        setCards={setDisplayToCards}
        setList={setDisplayToList}
      />
      <Hello>{currentUser}</Hello>
      <ChooseFilters
        filterSongsByName={filterSongsByName}
        filterSongsByGenre={filterSongsByGenre}
      ></ChooseFilters>
      {loadingStatus === "loading" && <EmptyList>Loading songs...</EmptyList>}
      {loadingStatus === "error" && (
        <EmptyList>Couldn't fetch songs list!</EmptyList>
      )}
      {!isEmpty && display === "cards" && loadingStatus === "loaded" && (
        <CardListOverlay>
          {filteredSongs?.map((song, i) => {
            return (
              <MusicCard
                key={i}
                id={song.id}
                img={song.img}
                title={song.title}
                author={song.author}
                album={song.album}
                genre={song.genre}
              />
            );
          })}
        </CardListOverlay>
      )}
      {!isEmpty && display === "list" && loadingStatus === "loaded" && (
        <ItemsListOverlay>
          {filteredSongs?.map((song, i) => {
            return (
              <MusicListItem
                key={i}
                id={song.id}
                img={song.img}
                title={song.title}
                author={song.author}
                album={song.album}
                genre={song.genre}
              />
            );
          })}
        </ItemsListOverlay>
      )}
      {isEmpty && (
        <EmptyList> Couldn't find any song matching your filters!</EmptyList>
      )}
      <Button styles="button--black-box-shadow" onClick={openNewSongCreator}>
        Add your own song to playlist
      </Button>
      {openAddSong && <AddSong closeAddSong={closeNewSongCreator} />}
    </AnimatedPages>
  );
};

export default MusicPage;
