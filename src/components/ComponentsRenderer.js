import React, { useContext } from "react";
import { GameContext } from "../GameContext";
import GameStart from "./GameStart";
import ShipsPlacement from "./ShipsPlacement";
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
      break;
    case "game_over":
      break;
    default:
      break;
  }

  console.log(state.players);
  return (
    <>
      <p>{state.message}</p>
      {component}
    </>
  );
}

export default ComponentsRenderer;
