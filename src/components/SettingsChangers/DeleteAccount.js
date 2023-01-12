import React, { useRef, useState, useMemo } from "react";
import styles from "./DeleteAccount.module.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/auth-slice";
import { songsActions } from "../../redux/songsList-slice";
import { playlistActions } from "../../redux/playlist-slice";
import { updateActions } from "../../redux/update-slice";
import { useNavigate } from "react-router-dom";
import { resetPlayer } from "../../actions/playerActions";
import { useDeleteCurrentUserMutation } from "../../redux/api/currentUserApiSlice";
import { useDeleteUserMutation } from "../../redux/api/userDataApiSlice";
import { songsApiSlice } from "../../redux/api/songsApiSlice";
import { usersApiSlice } from "../../redux/api/userDataApiSlice";
import Warning from "../UI/utils/Warning";
import AreYouSureModal from "../UI/utils/AreYouSureModal";
import Button from "../UI/utils/Button";

let modalManageState = false;

export default function DeleteAccount(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordInputRef = useRef(null);
  const audio = useSelector((state) => state.player.audio);
  const [showModal, setShowModal] = useState(false);

  const [deleteCurrentUser] = useDeleteCurrentUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const user = useSelector((state) => state.user.user);
  const [warning, setWarning] = useState(false);
  function toggleModalHandler() {
    if (!modalManageState) {
      setShowModal((prev) => !prev);
      setWarning(false);
    }

    if (modalManageState) {
      modalManageState = false;
    }
  }
  function deleteAccount() {
    if (passwordInputRef.current.value === user.password) {
      sessionStorage.setItem("isLogged", "false");
      sessionStorage.removeItem("currentUser");
      dispatch(songsActions.resetSongList());
      dispatch(playlistActions.resetPlaylists());
      dispatch(usersApiSlice.util.resetApiState());
      dispatch(songsApiSlice.util.resetApiState());
      deleteCurrentUser(user);
      deleteUser(user);
      dispatch(updateActions.shouldUpdate());
      navigate("/Musify");
      dispatch(resetPlayer(audio));
      modalManageState = false;
      setWarning(false);
      toggleModalHandler();
    } else {
      setWarning(true);
      modalManageState = true;
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
