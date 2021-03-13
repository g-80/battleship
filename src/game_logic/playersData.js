import Gameboard from "../factories/Gameboard";

const playersData = {
  human: {
    ships: [],
    gameboard: Gameboard(),
  },
  ai: {
    ships: [],
    gameboard: Gameboard(),
  },
};

export default playersData;
