import React from "react";
import Button from "../UI/utils/Button";
import styles from "./PlaylistItem.module.css";
import { playlistActions } from "../../redux/playlist-slice";
import { useDispatch } from "react-redux/es/exports";
import { motion } from "framer-motion";
import { updateActions } from "../../redux/update-slice";

export default function PlaylistItem(props) {
  const dispatch = useDispatch();
  const removeSong = () => {
    dispatch(
      playlistActions.removeSongFromPlaylist({
        itemId: props.id,
        playlistId: props.playlistId,
      })
    );
    dispatch(updateActions.shouldUpdate());
  };
  return (
    <motion.li
      key={props.id}
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      exit={{ transform: "scale(0)" }}
      transition={{ duration: 0.3 }}
      className={styles["list-item"]}
    >
      <p>{props.title}</p>
      <div className={styles["button-wrapper"]}>
        <Button onClick={removeSong}>
          <i className="bi bi-trash"></i>
        </Button>
      </div>
    </motion.li>
  );
}
