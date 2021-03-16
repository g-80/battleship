import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../GameContext";
import Gameboard from "./Gameboard";
import { shipReceiveHit, checkGameOver, aiAttack } from "../game_logic/battle";

function Battle() {
  // locations allowed for human player to attack
  const [humanAllowed, setHumanAllowed] = useState([]);
  const [hovered, setHovered] = useState();
  const { state, dispatch } = useContext(GameContext);
  const { human, ai } = state.players;

  const updateHumanAllowed = () => {
    setHumanAllowed(() => {
      const board = ai.gameboard.opponentBoard();
      return board.map((cell, index) => {
        if (cell === "empty") return index;
      });
    });
  };

  useEffect(() => {
    // initialise battle
    updateHumanAllowed();
    dispatch({ type: "SET_TURN", payload: "human" });
    dispatch({
      type: "SET_MESSAGE",
      payload: "It's your turn. Attack your opponent's ships",
    });
  }, []);

  useEffect(() => {
    console.log(ai.ships);
    if (state.turn === "ai") {
      setTimeout(() => aiAttack(ai, human, dispatch), 750);
    }
  }, [state.turn]);

  const onClickHandler = () => {
    // human attack
    const cell = hovered;
    if (humanAllowed.includes(cell) && state.turn === "human") {
      human.attack(cell, ai.gameboard);
      const isHit = ai.gameboard.isShipHit(cell);
      if (isHit) {
        shipReceiveHit(cell, ai, dispatch);
        checkGameOver("human", ai.gameboard, dispatch);
      } else {
        dispatch({ type: "SET_MESSAGE", payload: "Your shot misses" });
      }
      updateHumanAllowed();
      // set timout to create delay to make messages readable between state changes
      setTimeout(() => {
        dispatch({ type: "SET_TURN", payload: "ai" });
        dispatch({ type: "SET_MESSAGE", payload: "It's your opponents turn" });
      }, 1200);
    }
  };

  const mouseEnterHandler = (index) => {
    setHovered(index);
  };
  const mouseLeaveHandler = () => {
    setHovered();
  };
  return (
    <div className="board-container" style={{ justifyContent: "space-evenly" }}>
      <Gameboard owner="human" board={human.gameboard.board} />
      <Gameboard
        owner="ai"
        board={ai.gameboard.board}
        allowed={humanAllowed}
        onClickHandler={onClickHandler}
        mouseEnterHandler={mouseEnterHandler}
        mouseLeaveHandler={mouseLeaveHandler}
      />
    </div>
  );
}

export default Battle;
