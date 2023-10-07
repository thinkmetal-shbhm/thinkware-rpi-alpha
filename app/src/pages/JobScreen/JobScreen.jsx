import React, { useEffect, useState } from "react";
import JobInfo from "../../components/JobInfo/JobInfo";
import Controller from "../../components/Controller/Controller";
import CameraWindow from "../../components/CameraWindow/CameraWindow";
import PartPreview from "../../components/PartPreview/PartPreview";
import { useLocation } from "react-router-dom";
import { socket } from "../../socket";

function JobScreen() {
  const [isPaused, setIsPaused] = useState(true);
  const [progress, setProgress] = useState(null);
  // const [fetchinterval, setFetchInterval] = useState(null);
  const [heating, setHeating] = useState(null);
  const [prog, setProg] = useState(null);

  const location = useLocation();

  useEffect(() => {
    socket.on("progress", (data) => {
      setProgress(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    if (location.state?.message === "fileUploaded") {
      setHeating(true);
    }
  }, [location.state?.message]);

  useEffect(() => {
    setProg(progress ? !Object.keys(progress).length === 0 : false);
    if (progress?.finished) {
    }
  }, [progress]);

  return (
    <div style={{ width: "100%" }}>
      <JobInfo
        prog={prog}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        progress={progress}
        heating={heating}
        setHeating={setHeating}
      />
      <div style={{ display: "flex", margin: "3rem auto", width: "95%" }}>
        {isPaused ? (
          <Controller />
        ) : (
          <PartPreview url="./benchy.stl" name="benchy-3" CSSclass />
        )}
        <CameraWindow />
      </div>
    </div>
  );
}

export default JobScreen;
