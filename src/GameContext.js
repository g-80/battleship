import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

export const GameContext = createContext();

export const initialState = {
  players: {},
  turn: "",
  stage: "init",
  message: "",
  winner: "",
};

function GameContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
