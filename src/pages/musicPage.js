import React, { useState } from "react";
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
import Loader from "../components/UI/utils/Loader";

const MusicPage = () => {
  const [isError, isLoading] = useFetchMusic();
  const fetchPlaylists = useFetchPlaylists();
  const [openAddToPlaylistModal, setOpenAddToPlaylistModal] = useState(false);
  const [openAddSongModal, setOpenAddSongModal] = useState(false);
  const songsList = useSelector((state) => state.songsList.songsList);
  const currentUser = sessionStorage.getItem("currentUser");

  const [filteredSongs, setFilteredSongs] = useState(songsList);

  const [display, setDisplay] = useState("cards");

  const isEmpty = filteredSongs.length === 0;

  if (isError) {
    return <EmptyList>Couldn't fetch songs list!</EmptyList>;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <AnimatedPages>
      <main>
        <ChangeSongsDisplay
          setCards={() => setDisplay("cards")}
          setList={() => setDisplay("list")}
        />
        <Hello>{currentUser}</Hello>
        <ChooseFilters setFilteredSongs={setFilteredSongs}></ChooseFilters>

        {!isEmpty && display === "cards" && (
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
                  openModal={setOpenAddToPlaylistModal.bind(null, true)}
                />
              );
            })}
          </CardListOverlay>
        )}
        {!isEmpty && display === "list" && (
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
                  openModal={setOpenAddToPlaylistModal.bind(null, true)}
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
          onClick={() => setOpenAddSongModal(true)}
        >
          Add your own song to playlist
        </Button>
        {openAddSongModal && (
          <AddSong closeAddSong={() => setOpenAddSongModal(false)} />
        )}
        {openAddToPlaylistModal && (
          <AddToPlaylistModal
            closeModal={setOpenAddToPlaylistModal.bind(null, false)}
          />
        )}
      </main>
    </AnimatedPages>
  );
};

export default MusicPage;
