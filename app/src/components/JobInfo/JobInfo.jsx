import React, { useEffect, useState } from "react";
import styles from "./JobInfo.module.css";
import { pauseIcon, crossIcon, playIcon } from "../../assets/Icons";
import { pausePrint, resumePrint } from "../../printerUtils";
import { socket } from "../../socket";

function JobInfo({
  isPaused,
  setIsPaused,
  progress,
  heating,
  setHeating,
  prog,
}) {
  const [estimatedEnd, setEstimatedEnd] = useState("Unknown");
  const [remainingTime, setRemainingTime] = useState("Unknown");
  const [percent, setPercent] = useState("0%");
  const [currentRes, setCurrentRes] = useState(null);
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    socket.on("printerResponse", (data) => setCurrentRes(data.data));
  }, []);
  useEffect(() => {
    if (currentRes) {
      if (currentRes.indexOf("T:") !== -1) {
        const temp = currentRes.slice(
          currentRes.indexOf("T:") + 2,
          currentRes.indexOf("B:")
        );
        setTemp(temp);
        const W = currentRes.split("W:")[1];
        if (W == "0") setHeating(false);
      }
    }
  }, [currentRes]);

  useEffect(() => {
    if (progress) {
      if (!Object.keys(progress).length === 0) {
        const tt = +progress.totalETA;
        const ct = progress.currentTime;
        const minutes = +ct.split("m")[0];
        const seconds = +ct.slice(ct.indexOf("m") + 1, ct.indexOf("s")).trim();

        const value = ((minutes * 60 + seconds) / tt) * 100;

        setPercent(`${Math.floor(value)}%`);
        setEstimatedEnd(`${tt}s`);
        setRemainingTime(`${tt - minutes * 60 + seconds}s`);

        setIsPaused(progress.paused);
        console.log(
          "🚀 ~ file: JobInfo.jsx:48 ~ useEffect ~ progress:",
          progress
        );
      }
    }
  }, [progress]);

  return (
    <>
      <section className={styles.mainJobInfo}>
        <div className={styles.job}>
          <div className={styles.fileAndProgress}>
            <h3 className={styles.heading3}>JOB INFO</h3>
            <div>
              <h4 className={`${styles.fileName} ${styles.heading4}`}>
                cube.stl<span>{heating ? "Heating..." : percent}</span>
              </h4>
            </div>
            <div className={styles.progressBar}></div>
          </div>
          <div className={styles.actions}>
            <button
              disabled={!prog}
              className={styles.btn}
              onClick={async () => {
                if (isPaused) {
                  const resp = await resumePrint();
                  console.log(resp);
                } else {
                  const resp = await pausePrint();
                  console.log(resp);
                }
              }}
            >
              {!isPaused ? (
                <React.Fragment>
                  <img
                    style={{
                      opacity: prog ? "1" : "0.4",
                    }}
                    className={styles.pauseIcon}
                    src={pauseIcon}
                    alt="pause icon"
                  />
                  <p>Pause</p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <img
                    style={{
                      opacity: prog ? "1" : "0.4",
                    }}
                    className={styles.pauseIcon}
                    src={playIcon}
                    alt="play icon"
                  />
                  <p>Play</p>
                </React.Fragment>
              )}
            </button>
            <button disabled={!prog} className={styles.btn} onClick={() => {}}>
              <img
                style={{
                  opacity: prog ? "1" : "0.4",
                }}
                className={styles.crossIcon}
                src={crossIcon}
                alt="cancel icon"
              />
              <p>Cancel</p>
            </button>
          </div>
        </div>
        <div className={styles.remainingInfo}>
          <div className={styles.time}>
            <h3 className={styles.heading3}>TIME</h3>
            <h4 className={styles.heading4}>
              Remaining Time: {`${remainingTime}`}
            </h4>
            <p>Estimated time: {estimatedEnd}</p>
          </div>
          <div className={styles.circleContainer}>
            <div className={styles.circle}></div>
            <div className={styles.circleInside}></div>
          </div>
        </div>
      </section>
      <section className={styles.materialInfo}>
        <div className={styles.presetChild}>
          <div className={styles.presetItem}>
            <span>LAYER HEIGHT</span>
            <h3>200 µm</h3>
          </div>
          <div className={styles.presetItem}>
            <span>SPEED</span>
            <h3>100%</h3>
          </div>
        </div>

        <div className={styles.presetChild}>
          <div className={styles.materialName}>
            <span>MODEL MATERIAL</span>
            <h3>SS 316L</h3>
          </div>
          <div className={styles.materialName}>
            <span>SUPPORT MATERIAL</span>
            <h3>SS 316L</h3>
          </div>
        </div>

        <div className={styles.presetChild}>
          <h3>HEATING</h3>
          <div className={styles.barParent}>
            <div className={styles.barParent2}>
              <span>PRINTHEAD</span>
              <div className={styles.container}>
                <div className={styles.barcontainer}>
                  <div className={styles.barExtruder}></div>
                </div>
              </div>
            </div>
            <div className={styles.barParent2}>
              <span>BED</span>
              <div className={styles.container}>
                <div className={styles.barcontainer}>
                  <div className={styles.barBed}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default JobInfo;
