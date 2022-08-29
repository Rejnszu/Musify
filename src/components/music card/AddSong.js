import React, { useRef } from "react";
import Button from "../UI/Button";
import styles from "./AddSong.module.css";
import { useDispatch, useSelector } from "react-redux";
import { songsActions } from "../../redux/songsList-slice";
import EmptyImage from "../images/pusty.png";
let image;
export default function AddSong(props) {
  const songsList = useSelector((state) => state.songsList.songsList);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const albumRef = useRef(null);
  const genreRef = useRef(null);
  const dispatch = useDispatch();

  function setImage() {
    try {
      image = URL.createObjectURL(imageRef.current.files[0]);
    } catch (error) {
      image = EmptyImage;
    }
    return image;
  }
  function addNewSong(e) {
    e.preventDefault();
    dispatch(
      songsActions.addSongToList({
        img: setImage(),
        title:
          titleRef.current.value.length === 0
            ? "Unkown"
            : titleRef.current.value,
        author:
          authorRef.current.value.length === 0
            ? "Unkown"
            : authorRef.current.value,
        album:
          albumRef.current.value.length === 0
            ? "Unkown"
            : albumRef.current.value,
        genre:
          genreRef.current.value.length === 0
            ? "Unkown"
            : genreRef.current.value,
        id: songsList.length,
      })
    );

    props.closeAddSong();
  }

  return (
    <div className={styles["add-song__modal"]}>
      <form onSubmit={addNewSong} className={styles["add-song__form"]}>
        <label htmlFor="input-image">Add Image</label>
        <input ref={imageRef} type="file" id="input-image" />
        <label htmlFor="input-title">Add Title</label>
        <input ref={titleRef} id="input-title" />
        <label htmlFor="input-author">Add Author</label>
        <input ref={authorRef} id="input-author" />
        <label htmlFor="input-album">Add Album Name</label>
        <input ref={albumRef} id="input-album" />
        <label htmlFor="input-album">Add Music Genre</label>
        <input ref={genreRef} id="input-genre" />
        <div className={styles["add-song__button-wrapper"]}>
          <Button onClick={props.closeAddSong} type="button">
            Close
          </Button>
          <Button type="submit">Add Song</Button>
        </div>
      </form>
    </div>
  );
}
