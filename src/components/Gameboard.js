import React from "react";
import styles from "./styles/gameboard.module.css";

function Gameboard(props) {
  // Gameboard object
  const gameboardClass = props.gameboardClass;
  return (
    <>
      <div className={styles[gameboardClass]}>
        {props.board.map((cell, index) => (
          <div
            className={`${cell.hasShip ? styles.hasShip : styles.cell} ${
              props.hovered.includes(index) ? styles.allowed : styles.notAllowed
            }`}
            key={`cell-${index}`}
            onClick={props.onClickHandler}
            onMouseEnter={() => {
              props.mouseEnterHandler(index);
            }}
            onMouseLeave={props.mouseLeaveHandler}
          ></div>
        ))}
      </div>
    </>
  );
}

export default Gameboard;
