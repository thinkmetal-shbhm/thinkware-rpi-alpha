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
                style={{ maxHeight: "5rem" ,fontSize:"2rem",width:"20%",margin:"0 auto", padding:"0.5rem",borderRadius:"0.5rem",fontWeight:"500"}}
                disabled={!state.progress?.running}
              >
               Resume Job
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
