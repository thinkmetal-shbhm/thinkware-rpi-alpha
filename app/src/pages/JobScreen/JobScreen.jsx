import React, { useState } from "react";
import JobInfo from "../../components/JobInfo/JobInfo";
import Controller from "../../components/Controller/Controller";
import CameraWindow from "../../components/CameraWindow/CameraWindow";
import PartPreview from "../../components/PartPreview/PartPreview";

function JobScreen(partName) {
  const [ispaused,Setispaused]=useState(false)
  return (
    <div style={{ width: "100%" }}>
      <JobInfo />
      <button onClick={()=>Setispaused(!ispaused)}>pause/resume job</button>
      <div style={{ display: "flex", margin: "3rem auto",width:"95%" }}>

        {ispaused?
        <Controller />:
         <PartPreview url="./benchy.stl" name="benchy-3" CSSclass/>}
        <CameraWindow />
      </div>
    </div>
  );
}

export default JobScreen;
