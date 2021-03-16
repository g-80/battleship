import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../GameContext";
import {
  shipsTypes,
  createShips,
  setPlayerShips,
  placeAIShips,
} from "../game_logic/shipsPlacement";
import Gameboard from "./Gameboard";
import styles from "./styles/shipsPlacement.module.css";

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

  useEffect(() => {
    placeAIShips(players.ai.gameboard, dispatch);
    dispatch({
      type: "SET_MESSAGE",
      payload: "Place your ships on the gameboard",
    });
    // eslint-disable-next-line
  }, []);

  const mouseEnterHandler = (index) => {
    // the index will come from mapping the gameboard in the return statement
    const { length } = shipsTypes[currentShipIndex];
    const locationArray = gameboard.createLocationArray(index, length, axis);
    const collision = gameboard.checkCollisions(locationArray);
    // change colour of cells based on collision
    if (collision) {
      setHovered(locationArray);
      if (currentShipIndex === 4)
        // an ugly way to work around the one step delayed update of humanShipsLocations state
        // this and the ones in the other handlers
        setHumanShipsLocations([...humanShipsLocations, locationArray]);
    } else setHovered([]);
  };

  const mouseLeaveHandler = () => {
    if (currentShipIndex === 4) {
      const updatedLocations = humanShipsLocations.filter(
        (array) => array.length > 2
      );
      setHumanShipsLocations(updatedLocations);
    }
    setHovered([]);
  };

  const onClickHandler = () => {
    // hovered state is the location array
    if (hovered.length) {
      gameboard.updateCellsHaveShip(hovered);
      if (currentShipIndex < 4)
        setHumanShipsLocations([...humanShipsLocations, hovered]);
      if (currentShipIndex >= 4) {
        setHovered([]);
        const ships = createShips(humanShipsLocations);
        setPlayerShips("human", ships, dispatch);
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
    <div>
      <div className={styles.axisContainer}>
        <span>Axis</span>
        <button
          onClick={() => {
            if (axis === "x") setAxis("y");
            else setAxis("x");
          }}
          className={styles.axisBtn}
        >
          {axis}
        </button>
      </div>
      <div className="board-container" style={{ marginTop: "1%" }}>
        <Gameboard
          stage={state.stage}
          owner="human"
          board={gameboard.board}
          allowed={hovered}
          onClickHandler={onClickHandler}
          mouseEnterHandler={mouseEnterHandler}
          mouseLeaveHandler={mouseLeaveHandler}
        />
        <ul className={styles.list}>
          {shipsToPlace.map((ship, index) => {
            return <li key={`toPlace${index}`}>{ship.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default ShipsPlacement;
