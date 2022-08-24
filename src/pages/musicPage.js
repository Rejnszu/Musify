import React, { useEffect } from "react";
import MusicCard from "../components/music card/MusicCard";
import CardListOverlay from "../components/UI/CardListOverlay";
import { useSelector } from "react-redux/es/exports";
import { useState } from "react";
import SongFilter from "../components/filterMusic/SongFilter";
import EmptyList from "../components/UI/EmptyList";
import MusicListItem from "../components/music list/MusicListItem";
import AnimatedPages from "../components/UI/AnimatedPages";
import Button from "../components/UI/Button";
import AddSong from "../components/music card/AddSong";
import ItemsListOverlay from "../components/UI/ItemsListOverlay";

export default function MusicPage(props) {
  const songsList = useSelector((state) => state.songsList.songsList);

  const [filteredSongs, setFilteredSongs] = useState(songsList);
  const [openAddSong, setOpenAddSong] = useState(false);
  function openNewSongCreator() {
    setOpenAddSong(true);
  }
  function closeNewSongCreator() {
    setOpenAddSong(false);
  }
  const isEmpty = filteredSongs.length === 0;

  function filterSongs(value) {
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

  useEffect(() => {
    setFilteredSongs(songsList);
  }, [songsList]);
  return (
    <AnimatedPages>
      <SongFilter filterSongs={filterSongs} />
      {!isEmpty && props.display === "cards" && (
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
              />
            );
          })}
        </CardListOverlay>
      )}

      {!isEmpty && props.display === "list" && (
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
              />
            );
          })}
        </ItemsListOverlay>
      )}

      {isEmpty && (
        <EmptyList> Couldn't find any song matching your filters!</EmptyList>
      )}
      <Button onClick={openNewSongCreator}>
        Add your own song to playlist
      </Button>
      {openAddSong && <AddSong closeAddSong={closeNewSongCreator} />}
    </AnimatedPages>
  );
}
