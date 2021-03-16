import Ship from "../factories/Ship";

// the dispatch parameter here is the dispatch function from the reducer
const shipsTypes = [
  { name: "Carrier", length: 5 },
  { name: "Battleship", length: 4 },
  { name: "Destroyer", length: 3 },
  { name: "Submarine", length: 3 },
  { name: "Patrol boat", length: 2 },
];

const createShips = (array) => {
  // create ships objects from an array of locations arrays
  const shipsObjects = [];
  shipsTypes.forEach((ship, index) => {
    const location = array[index];
    const newShip = Ship(ship.name, location);
    shipsObjects.push(newShip);
  });
  return shipsObjects;
};

const setPlayerShips = (playerType, ships, dispatch) => {
  dispatch({
    type: "SET_PLAYER_SHIPS",
    payload: { player: playerType, ships },
  });
};

const createAIShipLocation = (gameboard, shipLength) => {
  // create ship location for AI player
  const axes = ["x", "y"];
  const randomAxis = axes[Math.floor(Math.random() * axes.length)];
  const availableCells = [];
  gameboard.board.forEach((cell, index) => {
    const collisionLocationArray = gameboard.createLocationArray(
      index,
      shipLength,
      randomAxis
    );
    if (gameboard.checkCollisions(collisionLocationArray))
      availableCells.push(index);
  });
  const randomCell =
    availableCells[Math.floor(Math.random() * availableCells.length)];
  const locationArray = gameboard.createLocationArray(
    randomCell,
    shipLength,
    randomAxis
  );
  return locationArray;
};

const placeAIShips = (aiGameboard, dispatch) => {
  const locationArrays = [];
  shipsTypes.forEach((ship) => {
    const location = createAIShipLocation(aiGameboard, ship.length);
    aiGameboard.updateCellsHaveShip(location);
    locationArrays.push(location);
  });
  const ships = createShips(locationArrays);
  setPlayerShips("ai", ships, dispatch);
};

export { shipsTypes, createShips, setPlayerShips, placeAIShips };
