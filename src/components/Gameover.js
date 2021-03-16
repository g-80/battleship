import React, { useContext, useEffect } from "react";
import { GameContext } from "../GameContext";
function GameOver() {
  const { state, dispatch } = useContext(GameContext);
  const onClickHandler = () => {
    dispatch({ type: "RESTART_GAME" });
  };
  useEffect(() => {
    if (state.winner === "human") {
      dispatch({ type: "SET_MESSAGE", payload: "You win" });
    } else {
      dispatch({ type: "SET_MESSAGE", payload: "Computer AI wins" });
    }
  }, []);

  return (
    <div className="board-container">
      <button onClick={onClickHandler} className="btn-main">
        Play again
      </button>
    </div>
  );
}

export default GameOver;
