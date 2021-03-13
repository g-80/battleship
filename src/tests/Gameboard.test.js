import Gameboard from "../factories/Gameboard";

const testGameboard = Gameboard();
const mockShip = { name: "Boat", length: 2 };

test("Gameboard has 100 cells", () => {
  let testBoard = [];
  for (let i = 0; i < 100; i++) {
    testBoard.push({ hasShip: false, isShot: false });
  }
  expect(testGameboard.board).toEqual(testBoard);
});

test("Create ship's location array", () => {
  expect(testGameboard.createLocationArray(25, mockShip, "y")).toEqual([
    25,
    35,
  ]);
});

test("Receive attack", () => {
  expect(testGameboard.isShipHit(3)).toBe(false);
});
test("Receive hit", () => {
  const locationArr = testGameboard.createLocationArray(25, mockShip, "y");
  testGameboard.updateCellsHaveShip(locationArr, mockShip);
  testGameboard.receiveAttack(25);
  expect(testGameboard.isShipHit(25)).toBe("Boat");
});

test("No collision", () => {
  expect(testGameboard.checkCollisions([2, 3, 4])).toBe(true);
});
test("x-axis collision", () => {
  expect(testGameboard.checkCollisions([7, 8, 9])).toBe(true);
  expect(testGameboard.checkCollisions([9, 10])).toBe(false);
});
test("y-axis collision", () => {
  expect(testGameboard.checkCollisions([5, 15])).toBe(true);
  expect(testGameboard.checkCollisions([91, 101])).toBe(false);
});
test("collision cell already contain ship", () => {
  expect(testGameboard.checkCollisions([24, 25])).toBe(false);
});
test("All ships are sunk", () => {
  testGameboard.receiveAttack(35);
  expect(testGameboard.areAllShipsSunk()).toBe(true);
});
