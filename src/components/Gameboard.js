import React from "react";
import playersData from "../game_logic/playersData";
import styles from "./styles/gameboard.module.css";

function Gameboard(props) {
  // Gameboard object
  const humanGameboard = playersData.human.gameboard;
  return (
    <>
      <div className={styles.gameboard}>
        {humanGameboard.board.map((cell, index) => (
          <div
            className={styles.cell}
            key={`cell-${index}`}
            onClick={() => {
              props.onClick(index);
            }}
            onMouseEnter={() => {
              props.onMouseEnter(index);
            }}
          ></div>
        ))}
      </div>
      {/* <div className={styles.gameboard}>
        {humanGameboard.opponentBoard().map((cell, index) => (
          <div className={styles.cell} key={`opponent-cell-${index}`}>
            {cell}
          </div>
        ))}
      </div> */}
    </>
  );
}

export default Gameboard;
