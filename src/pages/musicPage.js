import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/auth-slice";
import { fetchMusicData } from "../actions/musicActions";
import { fetchPlaylists } from "../actions/playlistActions";

import CardListOverlay from "../components/UI/CardListOverlay";
import MusicCard from "../components/MusicCard/MusicCard";
import Hello from "../components/UI/Hello";
import EmptyList from "../components/UI/EmptyList";
import MusicListItem from "../components/MusicList/MusicListItem";
import AnimatedPages from "../components/UI/AnimatedPages";
import Button from "../components/UI/Button";
import AddSong from "../components/MusicCard/AddSong";
import ItemsListOverlay from "../components/UI/ItemsListOverlay";
import ChooseFilters from "../components/FilterMusic/ChooseFilters";
import ChangeSongsDisplay from "../components/UI/ChangeSongsDisplay";
import AddToPlaylistModal from "../components/playlists/addToPlaylistModal/AddToPlaylistModal";

const MusicPage = () => {
  const dispatch = useDispatch();
  const { initialFetchMusicList, initialFetchPlaylists } = useSelector(
    (state) => state.authentication.initials
  );
  const [openModal, setOpenModal] = useState(false);
  const songsList = useSelector((state) => state.songsList.songsList);
  const playlists = useSelector((state) => state.playlist.playlists);
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
    if (initialFetchMusicList) {
      dispatch(fetchMusicData(currentUser, songsList));
      dispatch(authActions.handleInitialFetchMusicList(false));

      return;
    }
    dispatch(
      authActions.setUsersMusicList({
        currentUser,
        songsList,
      })
    );
  }, [currentUser, songsList, dispatch, initialFetchMusicList]);

  useEffect(() => {
    if (initialFetchPlaylists) {
      dispatch(fetchPlaylists(currentUser));
      dispatch(authActions.handleInitialFetchPlaylists(false));

      return;
    }
    dispatch(
      authActions.setUsersPlaylists({
        currentUser,
        playlists,
      })
    );
  }, [playlists, currentUser, dispatch, initialFetchPlaylists]);

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
