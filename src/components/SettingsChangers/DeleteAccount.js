import React, { useState } from "react";
import Button from "../UI/Button";
import styles from "./DeleteAccount.module.css";
import { motion } from "framer-motion";
import AreYouSureModal from "../UI/AreYouSureModal";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/auth-slice";
import { songsActions } from "../../redux/songsList-slice";
import { playlistActions } from "../../redux/playlist-slice";
import { deleteCurrentUser } from "../../redux/Actions/loginActions";
import { updateActions } from "../../redux/update-slice";
import { useHistory } from "react-router-dom";
import { resetPlayer } from "../../redux/Actions/playerActions";
export default function DeleteAccount(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const audio = useSelector((state) => state.player.audio);
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector((state) => state.authentication.currentUser);
  function toggleModalHandler() {
    setShowModal((prev) => !prev);
  }
  function deleteAccount() {
    dispatch(authActions.deleteAccount(currentUser));
    sessionStorage.setItem("isLogged", "false");
    sessionStorage.removeItem("currentUser");
    dispatch(songsActions.resetSongList());
    dispatch(playlistActions.resetPlaylists());
    deleteCurrentUser(currentUser);
    dispatch(updateActions.shouldUpdate());
    history.push("/Musify");
    dispatch(resetPlayer(audio));
  }
  return (
    <motion.div
      key={props.animate}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles["delete-account"]}
    >
      <Button onClick={toggleModalHandler}>Delete Account</Button>
      {showModal && (
        <AreYouSureModal
          removeItem={deleteAccount}
          closeModal={toggleModalHandler}
          text="Are you sure You want to delete your account?"
        />
      )}
    </motion.div>
  );
}
