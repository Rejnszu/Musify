import React from "react";
import styles from "./Header.module.scss";
const Header = (props) => {
  return (
    <header className={styles.header}>
      <h1>{props.children}</h1>
    </header>
  );
};

export default Header;
