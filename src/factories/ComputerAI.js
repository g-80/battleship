import Player from "./Player";

const ComputerAI = function () {
  const ComputerAI = {
    availableShots: [],
    shotsHit: [],
    sunkShipsCells: [],
    getRandomItemFromArray(array) {
      const index = Math.floor(Math.random() * array.length);
      return array[index];
    },

    updateAvailableShots(gameboard) {
      const opponentBoard = gameboard.opponentBoard();
      const newAvailableShots = [];
      const newShotsHit = [];
      opponentBoard.forEach((loc, index) => {
        if (loc === "empty") {
          newAvailableShots.push(index);
        } else if (loc === "hit") {
          if (this.sunkShipsCells.includes(index)) return;
          else newShotsHit.push(index);
        }
        this.availableShots = newAvailableShots;
        this.shotsHit = newShotsHit;
      });
    },

    // filter out sunk ships
    filterShotsHit(ships) {
      // eslint-disable-next-line
      this.shotsHit = this.shotsHit.filter((cell) => {
        const hitShip = ships.find((ship) => ship.position.includes(cell));
        if (hitShip.isSunk()) {
          this.sunkShipsCells.push(cell);
        } else return true;
      });
    },

    detectShips() {
      // locate any two shots that resemble a ship
      let detectedShip = this.shotsHit.filter((cell, index, thisArray) => {
        return (
          (thisArray.includes(cell + 1) && (cell + 1) % 10 !== 0) ||
          (thisArray.includes(cell - 1) && cell % 10 !== 0) ||
          thisArray.includes(cell + 10) ||
          thisArray.includes(cell - 10)
        );
      });

      // remove doubles
      detectedShip = detectedShip.filter((cell, i, thisArray) => {
        return thisArray.lastIndexOf(cell) === i;
      });
      if (detectedShip.length) {
        // firstShipCell is the first hit cell of a ship that is not sunk found on table
        // it's always the smallest in the array
        const firstShipCell = detectedShip[0];
        const axis = detectedShip[1] - firstShipCell === 1 ? "x" : "y";
        const possibleShots = [];
        if (axis === "x") {
          // push cell left to the detected ship unless it's in the last column
          if (firstShipCell % 10 !== 0) possibleShots.push(firstShipCell - 1);
          const furthestRight = detectedShip.find(
            (cell, index, thisArray) => !thisArray.includes(cell + 1)
          );
          // push cell right to the detected ship unless it's in the first column
          if ((furthestRight + 1) % 10 !== 0)
            possibleShots.push(furthestRight + 1);
        } else {
          // push lowermost cell unless if it's in the first row
          if (firstShipCell - 10 >= 0) possibleShots.push(firstShipCell - 10);
          const furthestUp = detectedShip.find(
            (cell, index, thisArray) => !thisArray.includes(cell + 10)
          );
          // push uppermost cell unless if it's in the last row
          if (furthestUp + 10 <= 100) possibleShots.push(furthestUp + 10);
        }
        // remove cells that are not available to shoot
        const filteredPossibleShots = possibleShots.filter((cell) =>
          this.availableShots.includes(cell)
        );
        return filteredPossibleShots;
      }
    },

    // after a hit on a new ship, get a next hit on that ship
    followUpSingleHits() {
      const hitCell = this.shotsHit[0];
      const possibleShots = [
        hitCell + 1,
        hitCell - 1,
        hitCell + 10,
        hitCell - 10,
      ];
      // eslint-disable-next-line
      const filteredPossibleShots = possibleShots.filter((cell) => {
        // only keep cells on that gameboard
        if (this.availableShots.includes(cell)) {
          // prevent possible shots across more than one row
          if (hitCell % 10 === 0) return (cell + 1) % 10 !== 0;
          else if ((hitCell + 1) % 10 === 0) return cell % 10 !== 0;
          else return true;
        }
      });

      return filteredPossibleShots;
    },

    // No single hits to follow up or detected ships, attack a random location
    getRandomLocation() {
      const shotLocation = this.getRandomItemFromArray(this.availableShots);
      return shotLocation;
    },

    getAttackLocation() {},
  };
  // ComputerAI is a composition of ComputerAI and Player
  const ComputerAIobj = Object.assign({}, Player("ai"), ComputerAI);
  return ComputerAIobj;
};

export default ComputerAI;
