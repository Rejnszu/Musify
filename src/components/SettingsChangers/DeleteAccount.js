import React, { useEffect, useRef, useState } from "react";
import styles from "./DeleteAccount.module.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { updateActions } from "../../redux/update-slice";
import { useNavigate } from "react-router-dom";

import Warning from "../UI/utils/Warning";
import AreYouSureModal from "../UI/utils/AreYouSureModal";
import Button from "../UI/utils/Button";
import Spinner from "../UI/utils/Spinner";
import useDeleteUser from "../../hooks/useDeleteUser";

let modalManageState = false;

export default function DeleteAccount(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordInputRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const [onDeleteUser, isLoading, isSuccess] = useDeleteUser();

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
      onDeleteUser(user);
      dispatch(updateActions.shouldUpdate());
      toggleModalHandler();
    } else {
      setWarning(true);
      modalManageState = true;
    }
  }
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
      sessionStorage.setItem("isLogged", "false");
    }
  }, [isSuccess, navigate]);
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
            {isLoading && <Spinner styles={styles["spinner--deleting"]} />}
          </div>
        </AreYouSureModal>
      )}
    </motion.div>
  );
}
