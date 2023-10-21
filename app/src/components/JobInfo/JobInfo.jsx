import React, { useEffect, useState } from "react";
import styles from "./JobInfo.module.css";
import { pauseIcon, crossIcon, playIcon } from "../../assets/Icons";
import { pausePrint, resumePrint, stopPrint } from "../../printerUtils";
import { secondsToDDHHMM } from "../../utils";

function JobInfo({
  isPaused,
  setIsPaused,
  progress,
  heating,
  setHeating,
  prog,
  temp,
  fileName,
  setFileName,
  setCreatedTime,
  backend,
}) {
  const [estimatedEnd, setEstimatedEnd] = useState("Unknown");
  const [remainingTime, setRemainingTime] = useState("Unknown");
  const [percent, setPercent] = useState("");
  const [extPercent, setExtPercent] = useState("10%");
  const [bedPercent, setBedPercent] = useState("20%");

  useEffect(() => {
    console.log("🚀 ~ file: JobInfo.jsx:42 ~ useEffect ~ progress:", progress);
    if (progress) {
      if (!(Object.keys(progress).length === 0)) {
        if (progress.currentTime) {
          // setHeating(false);
          const tt = +progress.totalETA;
          const ct = progress.currentTime;
          const minutes = +ct.split("m")[0] || 0;
          const seconds =
            +ct.slice(ct.indexOf("m") + 1, ct.indexOf("s")).trim() || 0;

          const value = ((minutes * 60 + seconds) / tt) * 100 || 0;
          const remaining = tt - (minutes * 60 + seconds);

          setPercent(`${Math.floor(value)}%`);
          setEstimatedEnd(
            tt == 0 && isNaN(tt) ? "Unknown" : `${secondsToDDHHMM(tt)}`
          );
          setRemainingTime(
            tt == 0 && isNaN(tt) ? "Unknown" : `${secondsToDDHHMM(remaining)}`
          );
          console.log(
            "🚀 ~ file: JobInfo.jsx:58 ~ useEffect ~ tt:",
            tt,
            ct,
            minutes,
            seconds,
            value
          );
        }

        setIsPaused(progress.paused);
        setHeating(progress.heating);
        console.log(
          "🚀 ~ file: JobInfo.jsx:75 ~ useEffect ~ progress.heating:",
          progress.heating
        );

        if (progress.finished || progress.stopped) {
          setFileName(null);
        }
        console.log(
          "🚀 ~ file: JobInfo.jsx:71 ~ useEffect ~ progress:",
          progress
        );
        setCreatedTime(progress.createdTime);
        console.log(progress.createdTime);
      }

      if (progress?.stopped) {
        localStorage.removeItem("current_files");
        localStorage.removeItem("plate_preview");
        localStorage.removeItem("tw__gcode");
      }
    } else {
      // setHeating(false);
      // localStorage.removeItem("current_files");
      // localStorage.removeItem("plate_preview");
      // localStorage.removeItem("gcode");
    }
  }, [progress]);

  useEffect(() => {
    // if (temp) {
    //   const ext = temp.split("B:")[0].split("/");
    //   const bed = temp.split("B:")[1].split("/");

    //   setExtPercent((+ext[0].trim() / +ext[1].trim()) * 100 + "%");
    //   setBedPercent((+bed[0].trim() / +bed[1].trim()) * 100 + "%");
    // }
    if (prog && !heating) {
      setExtPercent("100%");
      setBedPercent("100%");
    }
  }, [temp, heating, prog]);

  return (
    <>
      {heating || (!progress?.stopped && prog) ? (
        <section className={styles.mainJobInfo}>
          <div className={styles.job}>
            <h3 className={styles.heading3}>JOB INFO</h3>
            <div className={styles.jobConsole}>
              <div className={styles.fileAndProgress}>
                <div>
                  <h4
                    style={{ display: "flex", justifyContent: "space-between" }}
                    className={`${styles.fileName} ${styles.heading4}`}
                  >
                    <small style={{ marginRight: "0.5rem" }}>{fileName}</small>
                    <span style={{ margin: "auto", textAlign: "end" }}>
                      <span style={{ marginLeft: "auto" }}>
                        {heating ? "Heating..." : percent}
                      </span>
                    </span>
                  </h4>
                </div>
                <progress
                  className={styles.progress}
                  max={100}
                  value={percent.split("%")[0]}
                ></progress>
                {/* <div className={styles.progress}>
                  <div
                    className={styles.progressvalue}
                    style={{ "--percent-done": `${percent}%` }}
                  ></div>
                </div> */}
              </div>

              <div className={styles.actions}>
                <button
                  disabled={!prog}
                  className={styles.btn}
                  onClick={async () => {
                    if (isPaused) {
                      const resp = await resumePrint(backend);
                      console.log(resp);
                    } else {
                      const resp = await pausePrint(backend);
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
                <button
                  disabled={!prog}
                  className={styles.btn}
                  onClick={async () => {
                    const res = await stopPrint(backend);

                    if (res.status == 200) {
                      console.log(res);
                      setPercent("");
                      setRemainingTime("Unknown");
                      setEstimatedEnd("Unknown");
                    }
                  }}
                >
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
          </div>

          <div className={styles.remainingInfo}>
            <div className={styles.time}>
              <h3 className={styles.heading3}>TIME</h3>
              <h4 className={styles.heading4}>
                Remaining Time: {`${remainingTime}`}
              </h4>
              <p>Estimated time: {estimatedEnd}</p>
            </div>

            {/* <div className={styles.circleContainer}>
              <div className={styles.circle}></div>
              <div className={styles.circleInside}></div>
            </div> */}
          </div>
        </section>
      ) : (
        <div className={styles.noJobRunning}>
          <h3>No Job Running!</h3>
          <button
            // disabled={!prog}
            className={styles.btn}
            onClick={async () => {
              const res = await stopPrint(backend);

              if (res.status == 200) {
                console.log(res);
                setPercent("");
                setRemainingTime("Unknown");
                setEstimatedEnd("Unknown");
              }
            }}
          >
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
      )}
      {/* material info */}
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
                  <div
                    className={styles.barPercent}
                    style={{ height: extPercent }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={styles.barParent2}>
              <span>BED</span>
              <div className={styles.container}>
                <div className={styles.barcontainer}>
                  <div
                    className={styles.barPercent}
                    style={{ height: bedPercent }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {heating || (!progress?.stopped && prog) ? (
          ""
        ) : (
          <div className={styles.noJob}>
            {" "}
            <h3>No Job Running!</h3>
          </div>
        )}
      </section>
    </>
  );
}

export default JobInfo;
