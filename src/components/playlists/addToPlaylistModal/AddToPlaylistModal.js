import React, { useState } from "react";
import ReactDom from "react-dom";
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

  const songExistInList = playlists.filter(
    (playlist) => !playlist.items.includes(selectedSong)
  );
  function addSongToPlaylists(e) {
    e.preventDefault();

    dispatch(
      playlistActions.addSongToPlaylist({
        playlists: selectedPlaylists,
        song: selectedSong,
      })
    );
    
    closeModal();
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

  const Backdrop = () => {
    return <div onClick={closeModal} className={styles.backdrop}></div>;
  };
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      <div className={styles.modal}>
        <p>Song: {selectedSong.title}</p>
        <h2>Choose Playlists</h2>

        {isEmpty && <EmptyList>No playlists found.</EmptyList>}
        <form className={styles["modal__playlist__list"]}>
          {!isEmpty &&
            songExistInList.map((playlist, i) => {
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
