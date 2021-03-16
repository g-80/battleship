import React, { useContext } from "react";
import { GameContext } from "../GameContext";
import styles from "./styles/gameStart.module.css";

function GameStart() {
  const { dispatch } = useContext(GameContext);
  function startGame() {
    dispatch({ type: "CREATE_PLAYERS" });
    dispatch({ type: "SET_STAGE", payload: "ships_placement" });
  }
  return (
    <div className={styles.flexContainer}>
      <h1 className={styles.gameTitle}>Battleship</h1>
      <button onClick={startGame} className="btn-main">
        Start
      </button>
    </div>
  );
}

export default GameStart;
