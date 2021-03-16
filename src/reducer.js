import Player from "./factories/Player";
import ComputerAI from "./factories/ComputerAI";
import { initialState } from "./GameContext";
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
    case "SET_TURN":
      return { ...state, turn: payload };
    case "SET_WINNER":
      return { ...state, winner: payload };
    case "RESTART_GAME":
      return initialState;
    default:
      return state;
  }
}

export default reducer;
