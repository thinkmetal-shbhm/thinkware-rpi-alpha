import React from "react";
import styles from "./Controller.module.css";
import { move } from "../../printerUtils";
import { homeIcon } from "../../assets/Icons";

function Controller() {
  return (
    <div className={styles.mainControllerContainer}>
      <h2 className={styles.heading2}>CONTROLS</h2>
      <div className={styles.controls}>
        <div className={styles.xy}>
          <div className={styles.controllerButtons}>
            <XYBtns onClick={() => move("G1 Y1")} src={"InnerSector"}>
              +1
            </XYBtns>
            <XYBtns onClick={() => move("G1 X1")} src={"InnerSector"}>
              +1
            </XYBtns>
            <XYBtns onClick={() => move("G1 Y-1")} src={"InnerSector"}>
              -1
            </XYBtns>
            <XYBtns onClick={() => move("G1 X-1")} src={"InnerSector"}>
              -1
            </XYBtns>
            <XYBtns onClick={() => move("G1 Y10")} src={"OuterSector"}>
              +10
            </XYBtns>
            <XYBtns onClick={() => move("G1 X10")} src={"OuterSector"}>
              +10
            </XYBtns>
            <XYBtns onClick={() => move("G1 Y-10")} src={"OuterSector"}>
              -10
            </XYBtns>
            <XYBtns onClick={() => move("G1 X-10")} src={"OuterSector"}>
              -10
            </XYBtns>
            <button
              onClick={() => move("G90\nG28\nG29\nM500\nG91")}
              className={styles.btnXYHome}
            >
              <img src={homeIcon} />
            </button>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className={styles.z}>
            <button onClick={() => move("G1 Z-10")}>
              <span>↥</span>
              10
            </button>
            <button onClick={() => move("G1 Z-1")}>
              <span>↥</span>1
            </button>
            <button onClick={() => move("G28 Z")}>
              <img src={homeIcon} />
            </button>
            <button onClick={() => move("G1 Z1")}>
              <span>↧</span>1
            </button>
            <button onClick={() => move("G1 Z10")}>
              <span>↧</span>
              10
            </button>
          </div>
          <div className={styles.extruder}>
            <div className={styles.extruderBar}></div>
            <button onClick={() => move("G1 E10")} className={styles.extrude}>
              ▲
            </button>
            <button onClick={() => move("G1 E-10")} className={styles.retract}>
              ▼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controller;

function XYBtns({ onClick, src, children }) {
  return (
    <div className={styles.btnXY}>
      {src === "InnerSector" ? (
        <svg
          pointerEvents="none"
          className={styles.svg}
          viewBox="0 0 413 413"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            pointerEvents="all"
            onClick={onClick}
            d="M260.508 413C260.508 269.126 143.874 152.492 0 152.492V317.692C52.637 317.692 95.3077 360.363 95.3077 413H260.508Z"
            fill="#373737"
          />
        </svg>
      ) : (
        <svg
          pointerEvents="none"
          className={styles.svg}
          viewBox="0 0 413 413"
          fill="#000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            pointerEvents="all"
            onClick={onClick}
            d="M0 0C228.094 0 413 184.906 413 413H266.862C266.862 265.616 147.384 146.138 0 146.138V0Z"
            fill="#000"
          />
        </svg>
      )}
      <span>{children}</span>
    </div>
  );
}
