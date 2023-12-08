import React, { useContext } from "react";
import JobInfo from "../../components/JobInfo/JobInfo";
import Controller from "../../components/Controller/Controller";
import PartPreview from "../../components/PartPreview/PartPreview";

import styles from "./JobScreen.module.css";
import { Context, DispatchCtx } from "../../Context";

function JobScreen() {
  const state = useContext(Context);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className={styles.cameraAndControls}>
        {!state.isPaused ? (
          <>
            <Controller backend={state.backend} />
            {state.isPaused && (
              <button
                style={{ maxHeight: "30px" }}
                disabled={!state.progress?.running}
              >
                Play
              </button>
            )}
          </>
        ) : (
          <>
            <JobInfo />
          </>
        )}
      </div>
    </div>
  );
}

export default JobScreen;
