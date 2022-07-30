import React, { useState } from "react";
import styles from "./AddToPlaylistModal.module.css";
import { useSelector, useDispatch } from "react-redux/es/exports";
import EmptyList from "../../UI/EmptyList";
import Button from "../../UI/Button";
import { playlistActions } from "../../../redux/playlist-slice";
import AddToPlaylistItem from "./AddToPlaylistItem";

export default function AddToPlaylistModal() {
  const dispatch = useDispatch();
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  function closeModal() {
    dispatch(playlistActions.closeModal());
  }
  const playlists = useSelector((state) => state.playlist.playlists);
  const selectedSong = useSelector((state) => state.songsList.selectedSong);
  function addSongToPlaylists(e) {
    e.preventDefault();

    dispatch(
      playlistActions.addSongToPlaylist({
        playlists: selectedPlaylists,
        song: selectedSong,
      })
    );
    // playlists.forEach((playlist) => console.log(playlist.items));
    // console.log(selectedPlaylists);
    // console.log(
    //   playlists.filter((playlist) => selectedPlaylists.includes(playlist))
    // );
  }
  function selectedPlaylistsAddHandler(playlist) {
    setSelectedPlaylists((previousSelectedPlaylists) => {
      return [...previousSelectedPlaylists, playlist];
    });
  }
  function selectedPlaylistsRemoveHandler(playlist) {
    setSelectedPlaylists((previousSelectedPlaylists) => {
      return previousSelectedPlaylists.filter(
        (playlists) => playlists !== playlist
      );
    });
  }
  const isEmpty = playlists.length === 0;
  return (
    <React.Fragment>
      <div onClick={closeModal} className={styles.backdrop}></div>
      <div className={styles.modal}>
        <p>Song: {selectedSong.title}</p>
        <h2>Choose Playlists</h2>

        {isEmpty && <EmptyList>No playlists found.</EmptyList>}
        <form className={styles["modal__playlist__list"]}>
          {!isEmpty &&
            playlists.map((playlist, i) => {
              return (
                <AddToPlaylistItem
                  playlist={playlist}
                  addPlaylistHandler={selectedPlaylistsAddHandler}
                  removePlaylistHandler={selectedPlaylistsRemoveHandler}
                  id={playlist.id}
                  key={i}
                  title={playlist.name}
                />
              );
            })}
          {!isEmpty && (
            <Button onClick={addSongToPlaylists}>Add To Playlist</Button>
          )}
        </form>
        <Button onClick={closeModal}>Close</Button>
      </div>
    </React.Fragment>
  );
}
