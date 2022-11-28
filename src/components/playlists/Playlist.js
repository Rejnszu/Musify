import React, { useState } from "react";
import styles from "./Playlist.module.css";
import { AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { playlistActions } from "../../redux/playlist-slice";
import { updateActions } from "../../redux/update-slice";
import { motion } from "framer-motion";
import AreYouSureModal from "../UI/utils/AreYouSureModal";
import AnimatedItems from "../UI/FramerGenerals/AnimatedItems";
import Button from "../UI/utils/Button";
import PlaylistItem from "./PlaylistItem";

export default function Playlist(props) {
  const dispatch = useDispatch();
  const [isShowMoreActive, setIsShowMoreActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isEmpty = props.items === undefined || props.items.length === 0;

  const removePlaylist = () => {
    dispatch(playlistActions.removePlaylist(props.id));
    dispatch(updateActions.shouldUpdate());
  };

  return (
    <AnimatedItems className={`${styles.playlist}`}>
      <p className={styles["playlist__title"]}>{props.name}</p>
      <Button
        onClick={() => setIsShowMoreActive((prevState) => !prevState)}
        styles={`${styles["button--show-more"]} ${
          isShowMoreActive ? styles.active : ""
        }`}
      >
        <i className="bi bi-chevron-double-down" />
      </Button>
      <AnimatePresence>
        {isEmpty && isShowMoreActive && (
          <motion.p
            key={props.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.isEmpty}
          >
            Your playlist is empty
          </motion.p>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isShowMoreActive && (
          <motion.ul
            key={props.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles["playlist__list"]}
          >
            <AnimatePresence>
              {!isEmpty &&
                props.items.map((item, i) => {
                  return (
                    <PlaylistItem
                      key={i}
                      id={item.id}
                      title={item.title}
                      playlistId={props.id}
                    />
                  );
                })}
            </AnimatePresence>
          </motion.ul>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setIsModalVisible(true)}
        styles={styles["button--playlist-close"]}
        type={"button"}
      >
        <i className="bi bi-x-lg"></i>
      </Button>
      {isModalVisible && (
        <AreYouSureModal
          removeItem={removePlaylist}
          closeModal={() => setIsModalVisible(false)}
          text="Are you sure you want delete playlist?"
        />
      )}
    </AnimatedItems>
  );
}
