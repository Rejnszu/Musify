import React, { useEffect } from "react";
import MusicCard from "../components/MusicCard/MusicCard";
import CardListOverlay from "../components/UI/CardListOverlay";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useState } from "react";
import Hello from "../components/UI/Hello";
import EmptyList from "../components/UI/EmptyList";
import MusicListItem from "../components/MusicList/MusicListItem";
import AnimatedPages from "../components/UI/AnimatedPages";
import Button from "../components/UI/Button";
import AddSong from "../components/MusicCard/AddSong";
import ItemsListOverlay from "../components/UI/ItemsListOverlay";
import { authActions } from "../redux/auth-slice";
import ChooseFilters from "../components/FilterMusic/ChooseFilters";

export default function MusicPage(props) {
  const dispatch = useDispatch();
  const songsList = useSelector((state) => state.songsList.songsList);
  const currentUser = sessionStorage.getItem("currentUser");
  const loadingStatus = useSelector((state) => state.songsList.loadingStatus);
  const [filteredSongs, setFilteredSongs] = useState(songsList);
  const [openAddSong, setOpenAddSong] = useState(false);

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
    dispatch(
      authActions.setUsersMusicList({
        currentUser,
        songsList,
      })
    );
  }, [songsList, dispatch, currentUser]);
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
      <Hello>{currentUser}</Hello>
      <ChooseFilters
        filterSongsByName={filterSongsByName}
        filterSongsByGenre={filterSongsByGenre}
      ></ChooseFilters>
      {loadingStatus === "loading" && <EmptyList>Loading songs...</EmptyList>}
      {loadingStatus === "error" && (
        <EmptyList>Couldn't fetch songs list!</EmptyList>
      )}
      {!isEmpty && props.display === "cards" && loadingStatus === "loaded" && (
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
      {!isEmpty && props.display === "list" && loadingStatus === "loaded" && (
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
}
