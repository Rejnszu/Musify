import React from "react";
import styles from "./ChartsItem.module.scss";
import { useGetSongsDetailsQuery } from "../../redux/api/songsApi";
import AnimatedItems from "../UI/FramerGenerals/AnimatedItems";
import EmptyImage from "../../assets/images/pusty.png";
const ChartsItem = (props) => {
  const { name, artist } = props;
  const { data, isLoading, isError } = useGetSongsDetailsQuery({
    artist: artist,
    name: name,
  });
  let image;
  const song = data?.track;
  const songName = song?.name;
  const songArtist = song?.artist.name;
  console.log(song);
  if (song?.album?.image[2] !== undefined) {
    image = Object.values(song?.album?.image[2])[0];
  }

  if (isError) {
    return;
  }
  if (isLoading) {
    return;
  }
  if (songName === undefined || songArtist === undefined) {
    return;
  }
  return (
    <AnimatedItems>
      <li className={styles["charts__item"]}>
        <div className={styles["item__image-wrapper"]}>
          <img src={image || EmptyImage} alt={songName} loading="lazy" />
        </div>
        <div className={styles["item__text-wrapper"]}>
          <p>{songName}</p>
          <p>{songArtist}</p>
        </div>
      </li>
    </AnimatedItems>
  );
};

export default ChartsItem;
