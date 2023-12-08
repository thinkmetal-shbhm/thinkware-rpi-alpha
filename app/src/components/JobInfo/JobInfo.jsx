import React, { useContext } from "react";
import styles from "./JobInfo.module.css";
import { pauseIcon, crossIcon, playIcon } from "../../assets/Icons";
import { pausePrint, resumePrint, stopPrint } from "../../printerUtils";
import { secondsToDDHHMM } from "../../utils";
import { Context, DispatchCtx } from "../../Context";

import jobstyles from "../../components/PartPreview/PartPreview.module.css";

import {
  ESTIMATED_END,
  PERCENT,
  REMAINING_TIME,
} from "../../constants/actions";

function JobInfo() {
  const state = useContext(Context);
  const dispatch = useContext(DispatchCtx);

  return (
    <>
      {!(state.heating || (!state.progress?.stopped && state.prog)) ? (
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
                        {state.heating ? "Heating..." : state.percent || ""}
                      </span>
                    </span>
                  </h4>
                </div>
                <progress
                  className={styles.progress}
                  max={100}
                  value={state.percent?.split("%")[0] || ""}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width:"96%",
           margin: "0.5rem auto",
          height: "70vh",
        }}
      >
        <section className={styles.materialInfo} >
          <div className={styles.presetChild}>
            <div className={` ${styles.presetItem}`}>
              <span>LAYER HEIGHT</span>
              <h3>200 µm</h3>
            </div>
            <div className={styles.presetItem}>
              <span>SPEED</span>
              <h3>100%</h3>
            </div>
          </div>

          <div className={styles.presetChild}>
            <div className={`flex ${styles.materialName}`}>
              <span>MODEL MATERIAL</span>
              <h3>SS 316L</h3>
            </div>
            <div className={`flex ${styles.materialName}`}>
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

        <PreviewSection />
      </div>
    </>
  );
}

export default JobInfo;

function PreviewSection() {
  const state = useContext(Context);
  return (
    <div className={jobstyles.jobPreviewCard} style={{ textAlign: "center" }}>
      <div className={jobstyles.previewContainer}>
        <img
          className={jobstyles.previewImg}
          src={state.preview}
          alt="preview"
          width={"100%"}
          // height={"100%"}
        />
      </div>
      <div className={jobstyles.jobPreviewInfo}>
        <h3 style={{ textAlign: "center",fontSize:"3rem" }}>
          {state.fileName ? state.fileName.split(".")[0] : `dummy.stl`}
        </h3>
       
      </div>
    </div>
  );
}
