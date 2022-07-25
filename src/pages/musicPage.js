import React from "react";
import MusicCard from "../components/music card/MusicCard";
import Overlay from "../components/UI/cardListOverlay";
import { useSelector } from "react-redux/es/exports";
export default function MusicPage() {
  const songsList = useSelector((state) => state.songCards.songsList);
  return (
    <Overlay>
      {songsList.map((song, i) => {
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
  );
}
