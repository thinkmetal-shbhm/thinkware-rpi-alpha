import React from "react";
import styles from "./Controller.module.css";
import { move } from "../../printerUtils";
import { extruderSvg, homeIcon, xyWebp } from "../../assets/Icons";

function Controller({ backend }) {
  return (
    <div className={styles.mainControllerContainer}>
      <h2 className={styles.heading2} style={{ opacity: 0.7 }}>
        CONTROLS
      </h2>
      <div className={styles.controls}>
        <div className={styles.xy}>
          <div className={styles.controllerButtons}>
            <XYBtns onClick={() => move("G1 Y1", backend)} src={"InnerSector"}>
              +1
            </XYBtns>
            <XYBtns onClick={() => move("G1 X1", backend)} src={"InnerSector"}>
              +1
            </XYBtns>
            <XYBtns onClick={() => move("G1 Y-1", backend)} src={"InnerSector"}>
              -1
            </XYBtns>
            <XYBtns onClick={() => move("G1 X-1", backend)} src={"InnerSector"}>
              -1
            </XYBtns>
            <XYBtns onClick={() => move("G1 Y10", backend)} src={"OuterSector"}>
              +10
            </XYBtns>
            <XYBtns onClick={() => move("G1 X10", backend)} src={"OuterSector"}>
              +10
            </XYBtns>
            <XYBtns
              onClick={() => move("G1 Y-10", backend)}
              src={"OuterSector"}
            >
              -10
            </XYBtns>
            <XYBtns
              onClick={() => move("G1 X-10", backend)}
              src={"OuterSector"}
            >
              -10
            </XYBtns>
            <button
              onClick={() => move("G90\nG28\nG29\nM500\nG91", backend)}
              className={styles.btnXYHome}
            >
              {/* <img src={homeIcon} width={25} height={25} /> */}
              {/* <div
                style={{
                  position: "absolute",
                  borderRadius: "50%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "35px",
                  height: "35px",
                  backgroundColor: "#ffffff70",
                }}
              /> */}
              <img
                src={xyWebp}
                style={{
                  position: "absolute",
                  borderRadius: "50%",
                  // boxShadow: "0 0 15px #aaa",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  opacity: 0.7,
                  marginTop: "-1px",
                }}
                width={35}
              />
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            paddingTop: "27px",
            paddingBottom: "8px",
          }}
        >
          <div className={styles.z}>
            {/* <img
              src={bed}
              style={{
                position: "absolute",
                top: -25,
                left: 5,
                transform: "scaleX(-1)",
              }}
              width={50}
            /> */}
            <button onClick={() => move("G1 Z-10", backend)}>
              <span>↥</span>
              10
            </button>
            <button onClick={() => move("G1 Z-1", backend)}>
              <span>↥</span>1
            </button>
            <button
              className={styles.zHome}
              onClick={() => move("G28 Z", backend)}
            >
              <img src={homeIcon} width={25} height={25} />

              <sub>Z</sub>
            </button>
            {/* <img
              src={bed}
              style={{
                // position: "absolute",
                // top: -25,
                // left: 5,
                // transform: "scaleX(-1)",
                margin: "0.25rem auto",
              }}
              width={45}
            /> */}
            <button onClick={() => move("G1 Z1", backend)}>
              <span>↧</span>1
            </button>
            <button onClick={() => move("G1 Z10", backend)}>
              <span>↧</span>
              10
            </button>
          </div>
          <div className={styles.extruder}>
            <div className={styles.extruderBar}></div>
            <button
              onClick={() => move("G1 E10", backend)}
              className={styles.extrude}
            >
              ▲
            </button>
            <img
              src={extruderSvg}
              width={35}
              style={{ margin: "0.25rem auto", opacity: "0.7" }}
            />
            <button
              onClick={() => move("G1 E-10", backend)}
              className={styles.retract}
            >
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
            fill="#ffffff07"
          />
        </svg>
      ) : (
        <svg
          pointerEvents="none"
          className={styles.svg}
          viewBox="0 0 413 413"
          fill="#ffffff15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            pointerEvents="all"
            onClick={onClick}
            d="M0 0C228.094 0 413 184.906 413 413H266.862C266.862 265.616 147.384 146.138 0 146.138V0Z"
            fill="#ffffff15"
          />
        </svg>
      )}
      <span>{children}</span>
    </div>
  );
}
