import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../GameContext";

function Battle() {
  const { state, dispatch } = useContext(GameContext);
  const { human, ai } = state.players;

  return (
    <div>
      <div className={`player`}></div>
    </div>
  );
}
