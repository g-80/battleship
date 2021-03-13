import ComputerAI from "../factories/ComputerAI";

const testAI = ComputerAI();
let mockBoard = {};
beforeAll(() => {
  const mockCells = [];
  for (let i = 0; i < 100; i++) {
    mockCells.push("empty");
  }

  mockBoard = {
    cells: mockCells,
    opponentBoard() {
      return mockBoard.cells;
    },
    receiveAttack(cell) {
      // cells from 0 to 96 are empty, 97 to 99 have a ship
      if (cell > 96) mockBoard.cells[cell] = "hit";
      else mockBoard.cells[cell] = "miss";
    },
  };
});

function updateAvailableShots() {
  testAI.availableShots = mockBoard.cells.map((cell, index) => {
    if (cell === "empty") return index;
  });
}

beforeEach(updateAvailableShots);

test("random location attack on an empty cell", () => {
  let target = testAI.getRandomLocation();
  testAI.attack(target, mockBoard);
  const possibleResults = ["miss", "hit"];
  expect(possibleResults).toContain(mockBoard.cells[target]);
});

test("After getting a hit, find next cell of the ship", () => {
  testAI.attack(97, mockBoard);
  testAI.shotsHit.push(97);
  expect(testAI.followUpSingleHits()).toEqual([98, 96, 87]);
});

test("Detect ships when there are at least two adjacent hits", () => {
  testAI.attack(98, mockBoard);
  testAI.shotsHit.push(98);
  expect(testAI.detectShips()).toEqual([96, 99]);
});

test("Update detected ship cells when there's a miss", () => {
  testAI.attack(96, mockBoard);
  updateAvailableShots();
  expect(testAI.detectShips()).toEqual([99]);
});

test("Ship is sunk and not detected anymore", () => {
  testAI.attack(99, mockBoard);
  testAI.shotsHit.push(99);
  expect(testAI.detectShips()).toEqual([]);
});
