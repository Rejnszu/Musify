import React, { useState } from "react";
import styles from "./Playlist.module.css";
import { useSelector, useDispatch } from "react-redux";
import PlaylistItem from "./PlaylistItem";
import { playlistActions } from "../../redux/playlist-slice";
import Button from "../UI/Button";
import { motion } from "framer-motion";
import AreYouSureModal from "../UI/AreYouSureModal";
import { AnimatePresence } from "framer-motion";
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
      {isEmpty && <p className={styles.isEmpty}>Your playlist is empty</p>}

      <ul className={styles["playlist__list"]}>
        <AnimatePresence>
          {!isEmpty &&
            props.items.map((item, i) => {
              return (
                <PlaylistItem
                  key={i}
                  id={i}
                  title={item.title}
                  playlistId={props.id}
                />
              );
            })}
        </AnimatePresence>
      </ul>

      <Button
        onClick={openModal}
        styles={styles["button--playlist-close"]}
        type={"button"}
      >
        <i className="bi bi-x-lg"></i>
      </Button>
      {isModalVisible && (
        <AreYouSureModal
          removeItem={removePlaylist}
          closeModal={closeModal}
          text="Are you sure you want delete playlist?"
        />
      )}
    </motion.div>
  );
}
