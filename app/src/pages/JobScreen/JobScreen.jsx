import React, { useEffect, useState } from "react";
import JobInfo from "../../components/JobInfo/JobInfo";
import Controller from "../../components/Controller/Controller";
import CameraWindow from "../../components/CameraWindow/CameraWindow";
import PartPreview from "../../components/PartPreview/PartPreview";
import { useLocation } from "react-router-dom";

function JobScreen() {
  const [isPaused, setIsPaused] = useState(true);
  const [progress, setProgress] = useState(null);
  const [fetchinterval, setFetchInterval] = useState(null);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.message === "fileUploaded") {
      setFetchInterval(
        setInterval(() => {
          fetch("http://localhost:4000/api/v1/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              if (+res.status === 200) {
                setProgress(res.data);
              }
            });
        }, 5000)
      );
    }
  }, [location.state?.message]);

  useEffect(() => {
    if (progress?.progress?.finished) {
      clearInterval(fetchinterval);
    }
  }, [progress]);

  return (
    <div style={{ width: "100%" }}>
      <JobInfo
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        progress={progress}
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
