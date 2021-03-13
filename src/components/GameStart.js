import React, { useContext } from "react";
import { GameContext } from "../GameContext";

function GameStart() {
  const { dispatch } = useContext(GameContext);
  function startGame() {
    dispatch({ type: "CREATE_PLAYERS" });
    dispatch({ type: "SET_STAGE", payload: "ships_placement" });
    dispatch({
      type: "SET_MESSAGE",
      payload: "Place your ships on the gameboard",
    });
  }
  return (
    <div>
      <p>Battleship</p>
      <button onClick={startGame}>Start</button>
    </div>
  );
}

export default GameStart;
