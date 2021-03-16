// the dispatch parameter here is the dispatch function from the reducer

const shipReceiveHit = (cell, shipOwner, dispatch) => {
  const ship = shipOwner.ships.find((shipObj) => {
    return shipObj.position.includes(cell);
  });
  ship.hit(cell);
  if (shipOwner.type === "human") {
    dispatch({
      type: "SET_MESSAGE",
      payload: `Your opponent hit your ${ship.name}`,
    });
  } else {
    dispatch({
      type: "SET_MESSAGE",
      payload: "You hit an opponent's ship",
    });
  }
  if (ship.isSunk()) {
    if (shipOwner.type === "human") {
      dispatch({
        type: "SET_MESSAGE",
        payload: `Your ${ship.name} has sunk`,
      });
    } else {
      dispatch({
        type: "SET_MESSAGE",
        payload: `You have sunked your opponents's ${ship.name}`,
      });
    }
  }
};

const checkGameOver = (player, gameboard, dispatch) => {
  const areAllShipsSunk = gameboard.areAllShipsSunk();
  if (areAllShipsSunk) {
    dispatch({ type: "SET_WINNER", payload: player });
    dispatch({ type: "SET_TURN", payload: "" });
    dispatch({ type: "SET_STAGE", payload: "game_over" });
  }
};

const aiAttack = (ai, human, dispatch) => {
  ai.updateAvailableShots(human.gameboard);
  ai.filterShotsHit(human.ships);
  let cell;
  if (ai.shotsHit.length === 0) {
    cell = ai.getRandomLocation();
  } else if (ai.shotsHit.length === 1) {
    const possibleShots = ai.followUpSingleHits();
    cell = ai.getRandomItemFromArray(possibleShots);
  } else {
    const possibleShots = ai.detectShips();
    cell = ai.getRandomItemFromArray(possibleShots);
  }
  ai.attack(cell, human.gameboard);
  const isHit = human.gameboard.isShipHit(cell);
  if (isHit) {
    shipReceiveHit(cell, human, dispatch);
    checkGameOver("ai", human.gameboard, dispatch);
  } else {
    dispatch({ type: "SET_MESSAGE", payload: "The opponent's shot misses" });
  }
  setTimeout(() => {
    dispatch({ type: "SET_TURN", payload: "human" });
    dispatch({
      type: "SET_MESSAGE",
      payload: "It's your turn. Attack your opponent's ships",
    });
  }, 1200);
};

export { shipReceiveHit, checkGameOver, aiAttack };
