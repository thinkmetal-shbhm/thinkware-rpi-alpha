import React, { useEffect, useState } from "react";
import JobInfo from "../../components/JobInfo/JobInfo";
import Controller from "../../components/Controller/Controller";
import CameraWindow from "../../components/CameraWindow/CameraWindow";
import PartPreview from "../../components/PartPreview/PartPreview";

import jobstyles from "../../components/PartPreview/PartPreview.module.css";

import { useLocation } from "react-router-dom";
import { socket } from "../../socket";
import { get, post } from "../../utils";

import styles from "./JobScreen.module.css";

function JobScreen({ setIsConnected, backend }) {
  const [isPaused, setIsPaused] = useState(true);
  const [progress, setProgress] = useState(null);
  const [heating, setHeating] = useState(null);
  const [prog, setProg] = useState(null);
  const [fileName, setFileName] = useState(null);

  const [currentRes, setCurrentRes] = useState(null);
  const [temp, setTemp] = useState(null);

  const [createdTime, setCreatedTime] = useState(null);

  const [preview, setPreview] = useState(null);

  const location = useLocation();

  // useEffect(() => {
  // if (currentRes) {
  //   if (currentRes.indexOf("T:") !== -1) {
  //     const temp = currentRes.slice(
  //       currentRes.indexOf("T:") + 2,
  //       currentRes.indexOf("@:")
  //     );
  //     setTemp(temp);
  //     setHeating(true);
  //     const W = currentRes.split("W:")[1];
  //     if (W == "0") {
  //       post("/heated", { message: "heated" })
  //         .then((res) => res.json())
  //         .then((res) => {
  //           if (res.message === "heated") {
  //             setHeating(false);
  //           }
  //         });
  //       socket.emit("heated", "done");
  //     }
  //   }
  // } else {
  //   setHeating(false);
  // }
  // }, [currentRes]);

  useEffect(() => {
    const tempSocket = (data) => setTemp(data);
    const printerResponseSocket = (data) => setCurrentRes(data);
    const progressSocket = (data) => {
      setProgress(JSON.parse(data).data?.progress);
    };

    socket.on("tempReport", tempSocket);
    socket.on("progress", progressSocket);
    socket.on("printerResponse", printerResponseSocket);

    get(backend, "/progress")
      .then((res) => res.json())
      .then((res) => {
        console.log("🚀 ~ file: JobScreen.jsx:63 ~ .then ~ res:", res);
        if (
          res.data?.progress?.stopped ||
          Object.keys(res.data?.progress ? res.data?.progress : {}).length === 0
        ) {
          // localStorage.removeItem("current_files");
          // localStorage.removeItem("plate_preview");
          // localStorage.removeItem("tw__gcode");
        }
      });
    const previewInterval = setInterval(() => {
      // console.log("int");
      const partLS = localStorage.getItem("plate_preview");

      if (partLS) {
        setPreview(partLS);
        clearInterval(previewInterval);
      }
    }, 500);

    get(backend, "/connectionStatus")
      .then((res) => res.json())
      .then((res) =>
        res.message === "printer connection found"
          ? setIsConnected(true)
          : setIsConnected(false)
      );

    return () => {
      socket.off("progress", progressSocket);
      socket.off("printerResponse", printerResponseSocket);
    };
  }, []);

  useEffect(() => {
    const printingStartedSocket = () => {
      console.log("printingStarted");
      // setHeating(true);
    };
    if (location.state?.message === "fileUploaded") {
      socket.on("printingStarted", printingStartedSocket);
      setIsPaused(false);
    }
    return () => {
      setTimeout(() => {
        socket.off("printingStarted", printingStartedSocket);
      }, 30000);
    };
  }, [location.state?.message]);

  useEffect(() => {
    setProg(progress ? !(Object.keys(progress).length === 0) : false);
  }, [progress]);

  return (
    <div style={{ width: "100%" }}>
      <JobInfo
        backend={backend}
        temp={temp}
        prog={prog}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        progress={progress}
        heating={heating}
        setHeating={setHeating}
        fileName={fileName}
        setFileName={setFileName}
        setCreatedTime={setCreatedTime}
      />
      <div className={styles.row}>
        {isPaused ? (
          <Controller />
        ) : (
          <div
            className={jobstyles.jobPreviewCard}
            style={{ textAlign: "center" }}
          >
            <div className={jobstyles.previewContainer}>
              <img
                className={jobstyles.previewImg}
                src={preview}
                alt="preview"
                width={"100%"}
                // height={"100%"}
              />
            </div>
            <div className={jobstyles.jobPreviewInfo}>
              <h3 style={{ textAlign: "center" }}>
                {fileName ? fileName.split(".")[0] : `${name}`}
              </h3>
              <span>
                Created at:{" "}
                {createdTime ? Date(createdTime).toLocaleString() : "Unknown"}
              </span>
            </div>
          </div>
        )}
        <CameraWindow />
      </div>
    </div>
  );
}

export default JobScreen;
