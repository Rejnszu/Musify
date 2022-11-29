import React, { useRef } from "react";
import Button from "../UI/utils/Button";
import styles from "./AddSong.module.css";
import { useDispatch, useSelector } from "react-redux";
import { songsActions } from "../../redux/songsList-slice";
import EmptyImage from "../../assets/images/pusty.png";
import { updateActions } from "../../redux/update-slice";

let image;
export default function AddSong(props) {
  const imageRef = useRef(null);
  const urlRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const albumRef = useRef(null);
  const genreRef = useRef(null);
  const genreOptions = useSelector((state) => state.songsList.genreOptions);
  const dispatch = useDispatch();

  function getImage(file) {
    if (file === undefined) {
      image = EmptyImage;
      return;
    }
    function setImage() {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          image = reader.result;
          resolve(image);
        };
      });
    }
    setImage().then((resolve) => {
      image = resolve;
    });
  }

  function addNewSong(e) {
    e.preventDefault();
    getImage(imageRef.current.files[0]);

    setTimeout(() => {
      dispatch(
        songsActions.addSongToList({
          img: image,
          url: urlRef.current.value === 0 ? "Unknown" : urlRef.current.value,
          title:
            titleRef.current.value.length === 0
              ? "Unknown"
              : titleRef.current.value,
          author:
            authorRef.current.value.length === 0
              ? "Unknown"
              : authorRef.current.value,
          album:
            albumRef.current.value.length === 0
              ? "Unknown"
              : albumRef.current.value,
          genre: genreRef.current.value ? genreRef.current.value : "Unknown",
          id: Math.floor(Math.random() * Date.now()),
        })
      );

      props.closeAddSong();
      dispatch(updateActions.shouldUpdate());
    }, 100);
  }

  return (
    <div className={styles["add-song__modal"]}>
      <form onSubmit={addNewSong} className={styles["add-song__form"]}>
        <label htmlFor="input-image">Add Image</label>
        <input ref={imageRef} type="file" accept="image/*" id="input-image" />
        <label htmlFor="input-url">Add song URL</label>
        <input ref={urlRef} id="input-url" />
        <label htmlFor="input-title">Add Title</label>
        <input required ref={titleRef} id="input-title" />
        <label htmlFor="input-author">Add Author</label>
        <input ref={authorRef} id="input-author" />
        <label htmlFor="input-album">Add Album Name</label>
        <input ref={albumRef} id="input-album" />
        <label htmlFor="input-genre">Add Music Genre</label>
        <select
          ref={genreRef}
          id="input-genre"
          name="genre"
          className={styles["genre-select-input"]}
        >
          {genreOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
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
