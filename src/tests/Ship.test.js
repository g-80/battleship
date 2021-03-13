import Ship from "../factories/Ship";

const shipTest = Ship("Battleship", [1, 2, 3, 4]);

test("Ship factory length", () => {
  expect(shipTest.length).toEqual(4);
});

test("Ship factory hit function", () => {
  shipTest.hit(2);
  expect(shipTest.hits).toEqual([2]);
});

test("Ship factory is sunk function", () => {
  expect(shipTest.isSunk()).toEqual(false);
});

test("Ship factory is sunk function true", () => {
  shipTest.hit(1);
  shipTest.hit(3);
  shipTest.hit(4);
  expect(shipTest.isSunk()).toEqual(true);
});
