import Player from "./factories/Player";
import ComputerAI from "./factories/ComputerAI";

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "CREATE_PLAYERS":
      return {
        ...state,
        players: { human: Player("human"), ai: ComputerAI() },
      };
    case "SET_STAGE":
      return { ...state, stage: payload };
    case "SET_MESSAGE":
      return { ...state, message: payload };
    case "SET_PLAYER_SHIPS":
      const { player, ships } = payload;
      const newState = { ...state };
      newState.players[player].ships = ships;
      return { ...newState };
    default:
      return state;
  }
}

export default reducer;
