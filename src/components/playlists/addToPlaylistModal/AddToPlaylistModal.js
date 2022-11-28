import React, { useMemo, useState } from "react";
import ReactDom from "react-dom";
import styles from "./AddToPlaylistModal.module.css";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { playlistActions } from "../../../redux/playlist-slice";
import AddToPlaylistItem from "./AddToPlaylistItem";
import EmptyList from "../../UI/utils/EmptyList";
import Button from "../../UI/utils/Button";

export default function AddToPlaylistModal(props) {
  const dispatch = useDispatch();
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const playlists = useSelector((state) => state.playlist.playlists);

  const selectedSong = useSelector((state) => state.songsList.selectedSong);

  const playlistsWithoutSelectedSong = useMemo(
    () =>
      playlists.filter((playlist) => {
        if (playlist.items) {
          return !JSON.stringify(playlist.items).includes(
            JSON.stringify(selectedSong)
          );
        } else {
          return [];
        }
      }),
    [selectedSong, playlists]
  );

  function addSongToPlaylists(e) {
    e.preventDefault();

    dispatch(
      playlistActions.addSongToPlaylist({
        playlists: selectedPlaylists,
        song: selectedSong,
      })
    );

    props.closeModal();
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

  const isEmpty = playlistsWithoutSelectedSong.length === 0;

  const Backdrop = () => {
    return <div onClick={props.closeModal} className={styles.backdrop}></div>;
  };
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      <div className={styles.modal}>
        <p>Song: {selectedSong.title}</p>
        {!isEmpty && <h2>Choose Playlists</h2>}

        {isEmpty && <EmptyList>No playlists found.</EmptyList>}
        <form className={styles["modal__playlist__list"]}>
          {!isEmpty &&
            playlistsWithoutSelectedSong.map((playlist, i) => {
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
        <Button onClick={props.closeModal}>Close</Button>
      </div>
    </React.Fragment>
  );
}
