import React, { useRef, useState } from "react";
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
import Warning from "../UI/Warning";
export default function DeleteAccount(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const passwordInputRef = useRef(null);
  const audio = useSelector((state) => state.player.audio);
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const [warning, setWarning] = useState(false);
  function toggleModalHandler() {
    setShowModal((prev) => !prev);
    if (warning) {
      setWarning(false);
    }
  }
  function deleteAccount() {
    if (passwordInputRef.current.value === currentUser.password) {
      dispatch(authActions.deleteAccount(currentUser));
      sessionStorage.setItem("isLogged", "false");
      sessionStorage.removeItem("currentUser");
      dispatch(songsActions.resetSongList());
      dispatch(playlistActions.resetPlaylists());
      deleteCurrentUser(currentUser);
      dispatch(updateActions.shouldUpdate());
      history.push("/Musify");
      dispatch(resetPlayer(audio));
      setWarning(false);
      toggleModalHandler();
    } else {
      setWarning(true);
    }
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
          condition={warning}
          removeItem={deleteAccount}
          closeModal={toggleModalHandler}
          text="Are you sure You want to delete your account?"
        >
          <div className={styles["password-confirmation"]}>
            <label htmlFor="confirm">Enter your password.</label>
            <input ref={passwordInputRef} id="confirm"></input>
            {warning && <Warning>Wrong password.</Warning>}
          </div>
        </AreYouSureModal>
      )}
    </motion.div>
  );
}
