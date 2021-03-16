const Gameboard = function () {
  const boardCells = [];
  for (let i = 0; i < 100; i++) {
    boardCells.push({ hasShip: false, isShot: false });
  }
  return {
    board: boardCells,
    createLocationArray(cell, shipLength, axis) {
      const locationArray = [];
      for (let i = 0; i < shipLength; i++) {
        axis === "x"
          ? locationArray.push(cell + i)
          : locationArray.push(cell + i * 10);
      }
      return locationArray;
    },

    updateCellsHaveShip(locationArray) {
      locationArray.forEach((cell) => {
        this.board[cell].hasShip = true;
      });
    },

    checkCollisions(locationArray) {
      const collisions = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
      if (locationArray.some((cell) => !this.board[cell])) {
        // x-axis collision
        return false;
      } else if (locationArray.some((cell) => this.board[cell].hasShip)) {
        // check if cell already has a ship
        return false;
      } else if (
        // y-axis collision
        collisions.some((collisionCell) =>
          [collisionCell, collisionCell + 1].every((combination) =>
            locationArray.includes(combination)
          )
        )
      ) {
        return false;
      } else {
        return true;
      }
    },

    receiveAttack(cell) {
      this.board[cell].isShot = true;
    },

    isShipHit(cell) {
      return this.board[cell].hasShip;
    },

    areAllShipsSunk() {
      const shipsCells = this.board.filter((cell) => cell.hasShip);
      return shipsCells.every((cell) => cell.isShot);
    },

    // this returns a version of the game board that represents what the opponent is allowed to see
    opponentBoard() {
      return this.board.map((cell) => {
        return cell.isShot && cell.hasShip
          ? "hit"
          : cell.isShot
          ? "miss"
          : "empty";
      });
    },
  };
};

export default Gameboard;
