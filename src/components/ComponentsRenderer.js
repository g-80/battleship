import React, { useContext } from "react";
import { GameContext } from "../GameContext";
import GameStart from "./GameStart";
import ShipsPlacement from "./ShipsPlacement";
import Battle from "./Battle";
import GameOver from "./Gameover";
function ComponentsRenderer() {
  // renders components depending on the stage of the game
  const { state } = useContext(GameContext);
  let component;
  switch (state.stage) {
    case "init":
      component = <GameStart />;
      break;
    case "ships_placement":
      component = <ShipsPlacement />;
      break;
    case "battle":
      component = <Battle />;
      break;
    case "game_over":
      component = <GameOver />;
      break;
    default:
      break;
  }

  return (
    <>
      {state.stage !== "init" ? <p className="msg">{state.message}</p> : ""}
      {component}
    </>
  );
}

export default ComponentsRenderer;
