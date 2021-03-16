import Gameboard from "./Gameboard";

const Player = function (type) {
  return {
    type,
    ships: [],
    gameboard: Gameboard(),
    attack(location, gameboard) {
      if (gameboard.opponentBoard()[location] === "empty") {
        gameboard.receiveAttack(location);
      }
    },
  };
};

export default Player;
