import React from "react";
import { useState } from "react";
import styles from "./Select.module.css";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../redux/player-slice";
export default function Select(props) {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const nowPlayingPlayList = useSelector(
    (state) => state.player.nowPlayingPlayList
  );

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };
  const choosePlaylist = (e) => {
    props.onClick(e.target.value);
    dispatch(
      playerActions.setNowPlayingPlaylist(e.target.getAttribute("name"))
    );

    toggleDropdown();
  };

  return (
    <div className={styles["select__overlay"]}>
      <p onClick={toggleDropdown} className={styles["select__default-value"]}>
        <span className={styles["select__default-value__placeholder"]}>
          {nowPlayingPlayList === undefined
            ? props.placeholder
            : nowPlayingPlayList}
        </span>
        <span className={styles["select__default-value__icon"]}>
          {props.icon}
        </span>
      </p>
      <div
        className={`${styles["select__dropdown"]} ${
          showDropdown ? styles["active"] : ""
        }`}
      >
        <ul className={styles["select__dropdown__list"]}>
          {props?.options.map((item) => {
            return (
              <li
                onClick={choosePlaylist}
                className={styles["select__dropdown__list__item"]}
                key={item.id}
                value={item.id}
                name={item.name}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
