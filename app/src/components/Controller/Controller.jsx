import React from "react";
import styles from "./Controller.module.css";
import { InnerSector, OuterSector } from "../../assets/buttons";
import { move } from "../../printerUtils";
import { homeIcon } from "../../assets/Icons";

function Controller() {
  return (
    <div className={styles.mainControllerContainer}>
      <h2 className={styles.heading2}>CONTROLS</h2>
      <div className={styles.controls}>
        <div className={styles.xy}>
          <div className={styles.controllerButtons}>
            <div onClick={(e) => move("G1 Y1")} className={styles.btnXY}>
              <img src={InnerSector} className={styles.svg} />
              <span>+1</span>
            </div>
            <div onClick={(e) => move("G1 X1")} className={styles.btnXY}>
              <img src={InnerSector} className={styles.svg} />
              <span>+1</span>
            </div>
            <div onClick={(e) => move("G1 Y-1")} className={styles.btnXY}>
              <img src={InnerSector} className={styles.svg} />
              <span>-1</span>
            </div>
            <div onClick={(e) => move("G1 X-1")} className={styles.btnXY}>
              <img src={InnerSector} className={styles.svg} />
              <span>-1</span>
            </div>
            <div onClick={(e) => move("G1 Y10")} className={styles.btnXY}>
              <img src={OuterSector} className={styles.svg} />
              <span>+10</span>
            </div>
            <div onClick={(e) => move("G1 X10")} className={styles.btnXY}>
              <img src={OuterSector} className={styles.svg} />
              <span>+10</span>
            </div>
            <div onClick={(e) => move("G1 Y-10")} className={styles.btnXY}>
              <img src={OuterSector} className={styles.svg} />
              <span>-10</span>
            </div>
            <div onClick={(e) => move("G1 X-10")} className={styles.btnXY}>
              <img src={OuterSector} className={styles.svg} />
              <span>-10</span>
            </div>
            <button
              onClick={(e) => move("G90\nG28\nG29\nM500\nG91")}
              className={styles.btnXYHome}
            >
              <img src={homeIcon} />
            </button>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className={styles.z}>
            <button onClick={(e) => move("G1 Z-10")}>
              <span>↥</span>
              10
            </button>
            <button onClick={(e) => move("G1 Z-1")}>
              <span>↥</span>1
            </button>
            <button onClick={(e) => move("G28 Z")}>
              <img src={homeIcon} />
            </button>
            <button onClick={(e) => move("G1 Z1")}>
              <span>↧</span>1
            </button>
            <button onClick={(e) => move("G1 Z10")}>
              <span>↧</span>
              10
            </button>
          </div>
          <div className={styles.extruder}>
            <div className={styles.extruderBar}></div>
            <button onClick={(e) => move("G1 E10")} className={styles.extrude}>
              ▲
            </button>
            <button onClick={(e) => move("G1 E-10")} className={styles.retract}>
              ▼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controller;
