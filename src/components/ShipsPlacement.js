import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../GameContext";
import Ship from "../factories/Ship";
import { shipsTypes, createAIShipLocation } from "../game_logic/shipsPlacement";
import Gameboard from "./Gameboard";

function ShipsPlacement() {
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const [axis, setAxis] = useState("x");
  const [hovered, setHovered] = useState([]);
  const [humanShipsLocations, setHumanShipsLocations] = useState([]);
  const [shipsToPlace, setShipsToPlace] = useState(shipsTypes);
  const { state, dispatch } = useContext(GameContext);
  const { players } = state;
  const { human } = players;
  const { gameboard } = human;

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

  const setPlayerShips = (playerType, ships) => {
    dispatch({
      type: "SET_PLAYER_SHIPS",
      payload: { player: playerType, ships },
    });
  };

  const placeAIShips = () => {
    const aiGameboard = players.ai.gameboard;
    const locationArrays = [];
    shipsTypes.forEach((ship) => {
      const location = createAIShipLocation(aiGameboard, ship.length);
      aiGameboard.updateCellsHaveShip(location);
      locationArrays.push(location);
    });
    const ships = createShips(locationArrays);
    setPlayerShips("ai", ships);
  };

  useEffect(() => {
    placeAIShips();
  }, []);

  const mouseEnterHandler = (index) => {
    // the index will come from mapping the gameboard in the return statement
    const { length } = shipsTypes[currentShipIndex];
    const locationArray = gameboard.createLocationArray(index, length, axis);
    const collision = gameboard.checkCollisions(locationArray);
    console.log(shipsToPlace);

    // change colour of cells based on collision
    if (collision) {
      setHovered(locationArray);
      if (currentShipIndex === 4)
        setHumanShipsLocations([...humanShipsLocations, locationArray]);
    } else setHovered([]);
  };

  const mouseLeaveHandler = () => {
    setHovered([]);
  };

  const onClickHandler = () => {
    // hovered state is the location array
    if (hovered.length) {
      gameboard.updateCellsHaveShip(hovered);
      if (currentShipIndex < 4)
        // an ugly way to work around the one step delayed update of humanShipsLocations state
        // this and the one in mouseEnterHandler
        setHumanShipsLocations([...humanShipsLocations, hovered]);
      if (currentShipIndex >= 4) {
        setHovered([]);
        const ships = createShips(humanShipsLocations);
        setPlayerShips("human", ships);
        dispatch({
          type: "SET_STAGE",
          payload: "battle",
        });
      } else {
        setShipsToPlace((prev) => {
          return prev.filter(
            (ship) => !(ship.name === shipsTypes[currentShipIndex].name)
          );
        });
        setCurrentShipIndex(currentShipIndex + 1);
        setHovered([]);
      }
    }
  };

  return (
    <>
      <div>
        <span>Axis</span>
        <button
          onClick={() => {
            setAxis("x");
          }}
        >
          X
        </button>
        <button
          onClick={() => {
            setAxis("y");
          }}
        >
          Y
        </button>
      </div>
      <Gameboard
        gameboardClass="player-gameboard"
        board={gameboard.board}
        hovered={hovered}
        onClickHandler={onClickHandler}
        mouseEnterHandler={mouseEnterHandler}
        mouseLeaveHandler={mouseLeaveHandler}
      />
      <ul>
        {shipsToPlace.map((ship, index) => {
          return <li key={`toPlace${index}`}>{ship.name}</li>;
        })}
      </ul>
    </>
  );
}

export default ShipsPlacement;
