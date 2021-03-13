const shipsTypes = [
  { name: "Carrier", length: 5 },
  { name: "Battleship", length: 4 },
  { name: "Destroyer", length: 3 },
  { name: "Submarine", length: 3 },
  { name: "Patrol boat", length: 2 },
];

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

export { shipsTypes, createAIShipLocation };
