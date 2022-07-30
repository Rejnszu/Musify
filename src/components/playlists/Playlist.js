import React, { useState } from "react";
import styles from "./Playlist.module.css";
import { useSelector, useDispatch } from "react-redux";
import PlaylistItem from "./PlaylistItem";
import { playlistActions } from "../../redux/playlist-slice";
import Button from "../UI/Button";
import { motion } from "framer-motion";
import AreYouSureModal from "../UI/AreYouSureModal";

export default function Playlist(props) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  function openModal() {
    setIsModalVisible(true);
  }
  function closeModal() {
    setIsModalVisible(false);
  }
  const isEmpty = props.items.length === 0;
  const removePlaylist = () => {
    dispatch(playlistActions.removePlaylist(props.id));
  };
  return (
    <motion.div
      key={props.id}
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      exit={{ transform: "scale(0)" }}
      transition={{ duration: 0.3 }}
      className={styles.playlist}
    >
      <p className={styles["playlist__title"]}>{props.name}</p>
      <ul className={styles["playlist__list"]}></ul>
      {isEmpty && <p className={styles.isEmpty}>Your playlist is empty</p>}
      {!isEmpty &&
        props.items.map((item) => {
          <PlaylistItem title={item.title} />;
        })}
      <Button
        onClick={openModal}
        styles={styles["button--playlist-close"]}
        type={"button"}
      >
        <i className="bi bi-x-lg"></i>
      </Button>
      {isModalVisible && (
        <AreYouSureModal
          removePlaylist={removePlaylist}
          closeModal={closeModal}
          text="Are you sure you want delete playlist?"
        />
      )}
    </motion.div>
  );
}
