import React, { useState } from "react";
import styles from "./JobInfo.module.css";
import { pauseIcon, crossIcon } from "../../assets/Icons";

function JobInfo({}) {
  const [estimatedEnd, setEstimatedEnd] = useState("Completed");

  return (
    <section className={styles.mainJobInfo}>
      <div className={styles.job}>
        <div className={styles.fileAndProgress}>
          <h3 className={styles.heading3}>JOB INFO</h3>
          <div>
            <h4 className={`${styles.fileName} ${styles.heading4}`}>
              cube.stl<span>45%</span>
            </h4>
          </div>
          <div className={styles.progressBar}></div>
        </div>
        <div className={styles.actions}>
          <button className={styles.btn} onClick={(e) => {}}>
            <img
              className={styles.pauseIcon}
              src={pauseIcon}
              alt="pause icon"
            />
            <p>Pause</p>
          </button>
          <button className={styles.btn} onClick={(e) => {}}>
            <img
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
          <h4 className={styles.heading4}>Remaining Time</h4>
          <p>Estimated end: {estimatedEnd}</p>
        </div>
        <div className={styles.circleContainer}>
          <div className={styles.circle}></div>
          <div className={styles.circleInside}></div>
        </div>
      </div>
    </section>
  );
}

export default JobInfo;
