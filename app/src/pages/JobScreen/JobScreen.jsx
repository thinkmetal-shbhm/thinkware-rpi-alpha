import React from "react";
import JobInfo from "../../components/JobInfo/JobInfo";
import Controller from "../../components/Controller/Controller";
import CameraWindow from "../../components/CameraWindow/CameraWindow";

function JobScreen() {
  return (
    <div style={{ width: "100%" }}>
      <JobInfo />
      <div style={{ display: "flex", margin: "3rem auto" }}>
        <Controller />
        <CameraWindow />
      </div>
    </div>
  );
}

export default JobScreen;
