import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import useFetchMusic from "../hooks/useFetchMusic";
import useFetchPlaylists from "../hooks/useFetchPlaylists";

import CardListOverlay from "../components/UI/Layout/CardListOverlay";
import MusicCard from "../components/MusicCard/MusicCard";
import Hello from "../components/UI/utils/Hello";
import EmptyList from "../components/UI/utils/EmptyList";
import MusicListItem from "../components/MusicList/MusicListItem";
import AnimatedPages from "../components/UI/FramerGenerals/AnimatedPages";
import Button from "../components/UI/utils/Button";
import AddSong from "../components/MusicCard/AddSong";
import ItemsListOverlay from "../components/UI/Layout/ItemsListOverlay";
import ChooseFilters from "../components/FilterMusic/ChooseFilters";
import ChangeSongsDisplay from "../components/UI/ChangeSongsDisplay";
import AddToPlaylistModal from "../components/playlists/addToPlaylistModal/AddToPlaylistModal";

const MusicPage = () => {
  const fetchMusic = useFetchMusic();
  const fetchPlaylists = useFetchPlaylists();
  const [openModal, setOpenModal] = useState(false);
  const songsList = useSelector((state) => state.songsList.songsList);
  const currentUser = sessionStorage.getItem("currentUser");
  const loadingStatus = useSelector((state) => state.songsList.loadingStatus);
  const [filteredSongs, setFilteredSongs] = useState(songsList);
  const [openAddSong, setOpenAddSong] = useState(false);
  const [display, setDisplay] = useState("cards");

  const isEmpty = filteredSongs.length === 0;

  function resetFilters() {
    setFilteredSongs(songsList);
  }

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
    setFilteredSongs(songsList);
  }, [songsList]);

  return (
    <AnimatedPages>
      <main>
        <ChangeSongsDisplay
          setCards={() => setDisplay("cards")}
          setList={() => setDisplay("list")}
        />
        <Hello>{currentUser}</Hello>
        <ChooseFilters
          filterSongsByName={filterSongsByName}
          filterSongsByGenre={filterSongsByGenre}
          reset={resetFilters}
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
                  openModal={setOpenModal.bind(null, true)}
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
                  openModal={setOpenModal.bind(null, true)}
                />
              );
            })}
          </ItemsListOverlay>
        )}
        {isEmpty && (
          <EmptyList> Couldn't find any song matching your filters!</EmptyList>
        )}
        <Button
          styles="button--black-box-shadow"
          onClick={() => setOpenAddSong(true)}
        >
          Add your own song to playlist
        </Button>
        {openAddSong && <AddSong closeAddSong={() => setOpenAddSong(false)} />}
        {openModal && (
          <AddToPlaylistModal closeModal={setOpenModal.bind(null, false)} />
        )}
      </main>
    </AnimatedPages>
  );
};

export default MusicPage;
