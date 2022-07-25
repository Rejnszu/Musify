import React from "react";
import MusicCard from "../components/music card/MusicCard";
import Overlay from "../components/UI/cardListOverlay";
import { useSelector } from "react-redux/es/exports";
import { useState } from "react";
import SongFilter from "../components/filterMusic/SongFilter";
import EmptyList from "../components/UI/EmptyList";
export default function MusicPage() {
  const songsList = useSelector((state) => state.songCards.songsList);
  const [filteredSongs, setFilteredSongs] = useState(songsList);
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
  return (
    <React.Fragment>
      <SongFilter filterSongs={filterSongs} />
      {!isEmpty && (
        <Overlay>
          {filteredSongs?.map((song, i) => {
            return (
              <MusicCard
                key={i}
                id={i}
                img={song.img}
                title={song.title}
                author={song.author}
                album={song.album}
              />
            );
          })}
        </Overlay>
      )}
      {isEmpty && <EmptyList />}
    </React.Fragment>
  );
}
