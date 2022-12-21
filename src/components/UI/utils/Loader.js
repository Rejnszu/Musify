import React, { useEffect, useState } from "react";
import styles from "./Loader.module.scss";

const Loader = () => {
  const helperArray = [1, 3, 2, 2, 1, 3, 1, 3, 2];
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * (3 - 1 + 1) + 1)
  );

  useEffect(() => {
    let blinkInterval = setInterval(() => {
      setRandomNumber((prevNumber) => {
        let number;
        do {
          number = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        } while (prevNumber === number);
        return number;
      });
    }, 400);
    return () => {
      clearInterval(blinkInterval);
    };
  });
  return (
    <div className={styles.loader}>
      {helperArray.map((tile, i) => {
        return (
          <div
            key={i}
            className={`${styles["loader__tile"]} ${
              tile === randomNumber ? styles.blink : ""
            } `}
          ></div>
        );
      })}
    </div>
  );
};

export default Loader;
