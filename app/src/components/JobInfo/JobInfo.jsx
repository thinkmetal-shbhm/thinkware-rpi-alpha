import React, { useContext, useEffect } from "react";
import styles from "./JobInfo.module.css";
import { pauseIcon, crossIcon, playIcon } from "../../assets/Icons";
import { pausePrint, resumePrint, stopPrint } from "../../printerUtils";
import { secondsToDDHHMM } from "../../utils";
import { Context, DispatchCtx } from "../../Context";
import {
  BED_PERCENT,
  CREATED_TIME,
  ESTIMATED_END,
  EXT_PERCENT,
  FILE_NAME,
  HEATING,
  IS_PAUSED,
  PERCENT,
  REMAINING_TIME,
} from "../../constants/actions";

function JobInfo() {
  // const [estimatedEnd, setEstimatedEnd] = useState("Unknown");
  // const [remainingTime, setRemainingTime] = useState("Unknown");
  // const [percent, setPercent] = useState("");
  // const [extPercent, setExtPercent] = useState("10%");
  // const [bedPercent, setBedPercent] = useState("20%");

  const state = useContext(Context);
  const dispatch = useContext(DispatchCtx);

  useEffect(() => {
    console.log(
      "🚀 ~ file: JobInfo.jsx:42 ~ useEffect ~ state.progress:",
      state.progress
    );
    if (state.progress) {
      if (!(Object.keys(state.progress).length === 0)) {
        if (state.progress.currentTime && state.progress.running) {
          // setHeating(false);
          const tt = +state.progress.totalETA;
          const ct = state.progress.currentTime;
          const minutes = +ct.split("m")[0] || 0;
          const seconds =
            +ct.slice(ct.indexOf("m") + 1, ct.indexOf("s")).trim() || 0;

          const value = ((minutes * 60 + seconds) / tt) * 100 || 0;
          const remaining = tt - (minutes * 60 + seconds);

          dispatch({ type: PERCENT, payload: `${Math.floor(value)}%` });
          // setPercent(`${Math.floor(value)}%`);
          dispatch({
            type: ESTIMATED_END,
            payload:
              tt == 0 && isNaN(tt) ? "Unknown" : `${secondsToDDHHMM(tt)}`,
          });
          // setEstimatedEnd(
          //   tt == 0 && isNaN(tt) ? "Unknown" : `${secondsToDDHHMM(tt)}`
          // );
          dispatch({
            type: REMAINING_TIME,
            payload:
              tt == 0 && isNaN(tt)
                ? "Unknown"
                : `${secondsToDDHHMM(remaining)}`,
          });
          // setRemainingTime(
          //   tt == 0 && isNaN(tt) ? "Unknown" : `${secondsToDDHHMM(remaining)}`
          // );
          console.log(
            "🚀 ~ file: JobInfo.jsx:58 ~ useEffect ~ tt:",
            tt,
            ct,
            minutes,
            seconds,
            value
          );
        }

        dispatch({ type: IS_PAUSED, payload: state.progress.paused });
        dispatch({ type: HEATING, payload: state.progress.heating });

        // setIsPaused(progress.paused);
        // setHeating(progress.heating);
        console.log(
          "🚀 ~ file: JobInfo.jsx:75 ~ useEffect ~ state.progress.heating:",
          state.progress.heating
        );

        if (state.progress.finished || state.progress.stopped) {
          dispatch({ type: FILE_NAME, payload: null });
          // setFileName(null);
        }
        console.log(
          "🚀 ~ file: JobInfo.jsx:71 ~ useEffect ~ state.progress:",
          state.progress
        );
        dispatch({ type: CREATED_TIME, payload: state.progress.createdTime });
        // setCreatedTime(state.progress.createdTime);
        console.log(state.progress.createdTime);
      } else {
        dispatch({ type: IS_PAUSED, payload: true });
        // setIsPaused(true);
      }

      if (state.progress?.stopped) {
        localStorage.removeItem("current_files");
        localStorage.removeItem("plate_preview");
        localStorage.removeItem("tw__gcode");
      }
    } else {
      dispatch({ type: IS_PAUSED, payload: true });

      // setIsPaused(true);

      // setHeating(false);
      // localStorage.removeItem("current_files");
      // localStorage.removeItem("plate_preview");
      // localStorage.removeItem("gcode");
    }
  }, [state.progress]);

  useEffect(() => {
    // if (temp) {
    //   const ext = temp.split("B:")[0].split("/");
    //   const bed = temp.split("B:")[1].split("/");

    //   setExtPercent((+ext[0].trim() / +ext[1].trim()) * 100 + "%");
    //   setBedPercent((+bed[0].trim() / +bed[1].trim()) * 100 + "%");
    // }
    if (state.prog && !state.heating) {
      dispatch({ type: EXT_PERCENT, payload: "100%" });
      dispatch({ type: BED_PERCENT, payload: "100%" });
      // setExtPercent("100%");
      // setBedPercent("100%");
    }
  }, [state.temp, state.heating, state.prog]);

  return (
    <>
      {state.heating || (!state.progress?.stopped && state.prog) ? (
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
                    <small style={{ marginRight: "0.5rem" }}>
                      {state.fileName}
                    </small>
                    <span style={{ margin: "auto", textAlign: "end" }}>
                      <span style={{ marginLeft: "auto" }}>
                        {state.heating ? "Heating..." : state.percent}
                      </span>
                    </span>
                  </h4>
                </div>
                <progress
                  className={styles.progress}
                  max={100}
                  value={state.percent.split("%")[0]}
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
                  disabled={!state.prog}
                  className={styles.btn}
                  onClick={async () => {
                    if (state.isPaused) {
                      const resp = await resumePrint(state.backend);
                      console.log(resp);
                    } else {
                      const resp = await pausePrint(state.backend);
                      console.log(resp);
                    }
                  }}
                >
                  {!state.isPaused ? (
                    <React.Fragment>
                      <img
                        style={{
                          opacity: state.prog ? "1" : "0.4",
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
                          opacity: state.prog ? "1" : "0.4",
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
                  disabled={!state.prog}
                  className={styles.btn}
                  onClick={async () => {
                    const res = await stopPrint(state.backend);

                    if (res.status == 200) {
                      console.log(res);

                      dispatch({ type: PERCENT, payload: null });
                      dispatch({ type: REMAINING_TIME, payload: null });
                      dispatch({ type: ESTIMATED_END, payload: null });
                      // setPercent("");
                      // setRemainingTime("Unknown");
                      // setEstimatedEnd("Unknown");
                    }
                  }}
                >
                  <img
                    style={{
                      opacity: state.prog ? "1" : "0.4",
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
                Remaining Time: {`${state.remainingTime || "Unknown"}`}
              </h4>
              <p>Estimated time: {state.estimatedEnd || "Unknown"}</p>
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
              const res = await stopPrint(state.backend);

              if (res.status == 200) {
                console.log(res);
                dispatch({ type: PERCENT, payload: null });
                dispatch({ type: REMAINING_TIME, payload: null });
                dispatch({ type: ESTIMATED_END, payload: null });
                // setPercent("");
                // setRemainingTime("Unknown");
                // setEstimatedEnd("Unknown");
              }
            }}
          >
            <img
              style={{
                opacity: state.prog ? "1" : "0.4",
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
                    style={{ height: state.extPercent }}
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
                    style={{ height: state.bedPercent }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!(state.heating || (!state.progress?.stopped && state.prog)) && (
          <div className={styles.noJob}>
            <h3>No Job Running!</h3>
          </div>
        )}
      </section>
    </>
  );
}

export default JobInfo;
