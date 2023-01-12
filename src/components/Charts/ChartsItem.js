import React, { useState } from "react";
import styles from "./ChartsItem.module.scss";
import { useGetSongsDetailsQuery } from "../../redux/api/songsApiSlice";
import NoteImage from "../../assets/images/note.jpg";
import timeFormatter from "../../utils/timeFormatters";
import useFetchMusic from "../../hooks/useFetchMusic";
import { useDispatch, useSelector } from "react-redux";
import { songsActions } from "../../redux/songsList-slice";
import { updateActions } from "../../redux/update-slice";
import { BsClock, BsArrowRepeat } from "react-icons/bs";
import { RiFolderMusicFill } from "react-icons/ri";

const ChartsItem = (props) => {
  const fetchMusic = useFetchMusic();
  const dispatch = useDispatch();
  const songsList = useSelector((state) => state.songsList.songsList);
  const [showNotification, setShowNotification] = useState({
    content: "Song added",
    visibility: false,
  });
  const { name, artist, position } = props;
  const { data, isLoading, isError } = useGetSongsDetailsQuery({
    artist: artist,
    name: name,
  });
  let image;
  const song = data?.track;
  const songName = song?.name;
  const songArtist = song?.artist.name;
  const listeners = song?.playcount;
  const songDuration = song?.duration;
  const songAlbum = song?.album?.title;
  const genre = song?.toptags?.tag[0]?.name;

  const addSongToList = () => {
    if (songsList.some((song) => song.title === songName)) {
      setShowNotification({
        content: "Song already exists in list",
        visibility: true,
      });
      setTimeout(
        () =>
          setShowNotification((prevNotification) => {
            return { ...prevNotification, visibility: false };
          }),
        1000
      );
      return;
    }
    dispatch(
      songsActions.addSongToList({
        img: image ? image : NoteImage,
        title: songName ? songName : "Unknown",
        author: songArtist ? songArtist : "Unkown",
        album: songAlbum ? songAlbum : "Unknown",
        genre: genre ? genre : "Unknown",
        id: Math.floor(Math.random() * Date.now()),
      })
    );
    dispatch(updateActions.shouldUpdate());
    setShowNotification({ content: "Song added", visibility: true });
    setTimeout(
      () =>
        setShowNotification((prevNotification) => {
          return { ...prevNotification, visibility: false };
        }),
      1000
    );
  };

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
    <li className={styles["charts__item"]} onClick={addSongToList}>
      {showNotification.visibility && (
        <p className={styles.notification}>
          <span>{showNotification.content}</span>
        </p>
      )}
      <div className={styles["group-first"]}>
        <div className={`${styles.section} ${styles["section--basics"]}`}>
          <p className={styles.position}>#{position}</p>
          <div className={styles["item__image-wrapper"]}>
            <img src={image || NoteImage} alt={songName} loading="lazy" />
          </div>
          <div className={styles["item__text-wrapper"]}>
            <p>{songName}</p>
            <p>{songArtist}</p>
          </div>
        </div>
      </div>
      <div className={styles["group-second"]}>
        <div className={`${styles.section} ${styles["section--listeners"]}`}>
          <BsArrowRepeat />
          <p>{listeners}</p>
        </div>
        <div className={`${styles.section} ${styles["section--album"]}`}>
          <RiFolderMusicFill />
          <p>{songAlbum ? songAlbum : "unknown"}</p>
        </div>
        <div className={`${styles.section} ${styles["section--duration"]}`}>
          <BsClock />
          <p>
            {timeFormatter(songDuration / 1000) !== "0:00"
              ? timeFormatter(songDuration / 1000)
              : "unknown"}
          </p>
        </div>
      </div>
    </li>
  );
};

export default ChartsItem;
