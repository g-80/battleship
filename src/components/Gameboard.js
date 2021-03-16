import React from "react";
import styles from "./styles/gameboard.module.css";

function Gameboard(props) {
  const owner = props.owner;
  const stage = props.stage;
  const board = props.board;
  const allowed = props.allowed;
  const onClickHandler = props.onClickHandler;
  const mouseEnterHandler = props.mouseEnterHandler;
  const mouseLeaveHandler = props.mouseLeaveHandler;

  const getCellsClass = (cell, index, type) => {
    // return style class depending on the game stage
    if (stage === "ships_placement") {
      // cell class
      if (type === "main") {
        return cell.hasShip ? styles.hasShip : styles.cell;
      } else {
        // cell hover class
        return allowed.includes(index) ? styles.allowed : styles.notAllowed;
      }
    } else {
      if (type === "main") {
        return cell.isShot && cell.hasShip
          ? styles.attackHit
          : cell.isShot
          ? styles.attackMiss
          : cell.hasShip && owner === "human"
          ? styles.hasShip
          : styles.cell;
      } else {
        if (owner === "ai") {
          return allowed.includes(index)
            ? styles.attackAllowed
            : styles.notAllowed;
        }
      }
    }
  };

  const createCells = () => {
    return board.map((cell, index) => {
      if (owner === "ai" || stage === "ships_placement") {
        // mouse handlers only needed when placing human ships and on AI's board
        return (
          <div
            className={`${getCellsClass(cell, index, "main")} ${getCellsClass(
              cell,
              index,
              "hover"
            )}`}
            key={`cell-${index}`}
            onClick={onClickHandler}
            onMouseEnter={() => {
              mouseEnterHandler(index);
            }}
            onMouseLeave={mouseLeaveHandler}
          ></div>
        );
      } else {
        return (
          <div
            className={`${getCellsClass(cell, index, "main")} ${getCellsClass(
              cell,
              index,
              "hover"
            )}`}
            key={`cell-${index}`}
            style={{ cursor: "default" }}
          ></div>
        );
      }
    });
  };

  return (
    <>
      <div
        className={`${styles.gameboard} ${
          stage === "ships_placement" ? styles.wml : ""
        }`}
      >
        {createCells()}
      </div>
    </>
  );
}

export default Gameboard;
