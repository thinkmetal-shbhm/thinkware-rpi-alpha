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
  const [heating, setHeating] = useState(null);
  const [prog, setProg] = useState(null);

  const [currentRes, setCurrentRes] = useState(null);
  const [temp, setTemp] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (currentRes) {
      if (currentRes.indexOf("T:") !== -1) {
        const temp = currentRes.slice(
          currentRes.indexOf("T:") + 2,
          currentRes.indexOf("@:")
        );
        setTemp(temp);
        const W = currentRes.split("W:")[1];
        if (W == "0") setHeating(false);
      }
    }
  }, [currentRes]);

  useEffect(() => {
    const printerResponseSocket = (data) => setCurrentRes(data.data);
    const progressSocket = (data) => {
      setProgress(data.data.progress);
      if (!data.data.progress) setHeating(false);
    };

    socket.on("progress", progressSocket);
    socket.on("printerResponse", printerResponseSocket);

    return () => {
      socket.off("progress", progressSocket);
      socket.off("printerResponse", printerResponseSocket);
    };
  }, []);

  useEffect(() => {
    if (location.state?.message === "fileUploaded") {
      console.log(location.state.files);
      if (prog) setHeating(true);
    }
  }, [location.state?.message]);

  useEffect(() => {
    setProg(progress ? !(Object.keys(progress).length === 0) : false);
  }, [progress]);

  return (
    <div style={{ width: "100%" }}>
      <JobInfo
        temp={temp}
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
