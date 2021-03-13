import playersData from "../game_logic/playersData";
import Gameboard from "./Gameboard";

const Player = function (type) {
  return {
    type,
    ships: [],
    gameboard: Gameboard(),
    opponentShips:
      type === "human" ? playersData.ai.ships : playersData.human.ships,
    opponentGameboard:
      type === "human" ? playersData.ai.gameboard : playersData.human.gameboard,
    attack(location, gameboard) {
      if (gameboard.opponentBoard()[location] === "empty") {
        gameboard.receiveAttack(location);
      }
    },
  };
};

export default Player;
