import Player from "../factories/Player";

const testPlayer = Player("human");
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
      mockBoard.cells[cell] = "miss";
    },
  };
});

test("attack on an empty cell", () => {
  const target = 10;
  testPlayer.attack(target, mockBoard);
  expect(mockBoard.cells[target]).toEqual("miss");
});

test("attack on an already hit cell", () => {
  const target = 10;
  expect(mockBoard.cells[target]).toEqual("miss");
  testPlayer.attack(target, mockBoard);
  expect(mockBoard.cells[target]).toEqual("miss");
});
