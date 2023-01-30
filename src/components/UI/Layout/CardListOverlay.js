import React, { useRef } from "react";
import styles from "./CardListOverlay.module.scss";

export default function CardListOverlay(props) {
  const overlayRef = useRef(null);

  function scrollRight() {
    if (window.innerWidth > 1200) {
      overlayRef.current.scrollLeft += window.innerWidth / 3;
    } else if (window.innerWidth <= 1200 && window.innerWidth >= 800) {
      overlayRef.current.scrollLeft += window.innerWidth / 2;
    } else {
      overlayRef.current.scrollLeft += window.innerWidth * 0.85;
    }
  }
  function scrollLeft() {
    if (window.innerWidth > 1200) {
      overlayRef.current.scrollLeft -= window.innerWidth / 3;
    } else if (window.innerWidth <= 1200 && window.innerWidth >= 800) {
      overlayRef.current.scrollLeft -= window.innerWidth / 2;
    } else {
      overlayRef.current.scrollLeft -= window.innerWidth * 0.85;
    }
  }

  return (
    <div className={styles.wrapper}>
      {props.direction !== "vertical" && (
        <React.Fragment>
          <button
            type="button"
            onClick={scrollLeft}
            className={`${styles["scroll-button"]} ${styles["scroll-button--left"]}`}
          >
            <i className="bi bi-caret-left-fill"></i>
          </button>
          <button
            type="button"
            onClick={scrollRight}
            className={`${styles["scroll-button"]} ${styles["scroll-button--right"]}`}
          >
            <i className="bi bi-caret-right-fill"></i>
          </button>
        </React.Fragment>
      )}
      <div
        ref={overlayRef}
        className={`${styles.overlay} ${styles[props.direction]}`}
      >
        {props.children}
      </div>
    </div>
  );
}
