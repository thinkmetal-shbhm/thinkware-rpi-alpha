import React, { useContext } from "react";
import JobInfo from "../../components/JobInfo/JobInfo";
import Controller from "../../components/Controller/Controller";
import CameraWindow from "../../components/CameraWindow/CameraWindow";
import PartPreview from "../../components/PartPreview/PartPreview";

import jobstyles from "../../components/PartPreview/PartPreview.module.css";

import styles from "./JobScreen.module.css";
import { Context, DispatchCtx } from "../../Context";

function JobScreen() {
  // const [isPaused, setIsPaused] = useState(true);
  // const [progress, setProgress] = useState(null);
  // const [heating, setHeating] = useState(null);
  // const [prog, setProg] = useState(null);
  // const [fileName, setFileName] = useState("Something...?");

  // const [temp, setTemp] = useState(null);

  // const [createdTime, setCreatedTime] = useState(null);

  // const [preview, setPreview] = useState(null);

  // const location = useLocation();

  const state = useContext(Context);

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
  //       getSocket().emit("heated", "done");
  //     }
  //   }
  // } else {
  //   setHeating(false);
  // }
  // }, [currentRes]);

  // useEffect(() => {
  //   const tempSocket = (data) => dispatch({ type: TEMP, payload: data });
  //   const printerResponseSocket = (data) =>
  //     dispatch({ type: CURRENT_RES, payload: data });
  //   // const tempSocket = (data) => setTemp(data);
  //   // const printerResponseSocket = (data) => setCurrentRes(data);
  //   const progressSocket = (data) => {
  //     dispatch({ type: PROGRESS, payload: JSON.parse(data).data?.progress });
  //     // setProgress(JSON.parse(data).data?.progress);
  //   };

  //   getSocket().on("tempReport", tempSocket);
  //   getSocket().on("progress", progressSocket);
  //   getSocket().on("printerResponse", printerResponseSocket);

  //   get(state.backend, "/progress")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("🚀 ~ file: JobScreen.jsx:63 ~ .then ~ res:", res);
  //       // if (
  //       //   res.data?.progress?.stopped ||
  //       //   Object.keys(res.data?.progress ? res.data?.progress : {}).length === 0
  //       // ) {
  //       // localStorage.removeItem("current_files");
  //       // localStorage.removeItem("plate_preview");
  //       // localStorage.removeItem("tw__gcode");
  //       // }
  //     });

  //   get(state.backend, "/getPrintData/preview")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       dispatch({ type: PREVIEW, payload: res.data });

  //       // setPreview(res.data);
  //     });
  //   get(state.backend, "/getPrintData/name")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(
  //         "🚀 ~ file: JobScreen.jsx:92 ~ .then ~ res.data: stetinngg-dfb-=bpodfb",
  //         res.data
  //       );

  //       dispatch({ type: FILE_NAME, payload: res.data });
  //       // setFileName(res.data);
  //     });
  //   // const previewInterval = setInterval(() => {
  //   //   // console.log("int");
  //   //   const partLS = localStorage.getItem("plate_preview");

  //   //   if (partLS) {
  //   //     setPreview(partLS);
  //   //     clearInterval(previewInterval);
  //   //   }
  //   // }, 500);

  //   get(state.backend, "/connectionStatus")
  //     .then((res) => res.json())
  //     .then(
  //       (res) =>
  //         res.message === "printer connection found"
  //           ? dispatch({ type: CONNECTED, payload: true })
  //           : dispatch({ type: CONNECTED, payload: false })

  //       // ? setIsConnected(true)
  //       // : setIsConnected(false)
  //     );

  //   return () => {
  //     getSocket().off("progress", progressSocket);
  //     getSocket().off("printerResponse", printerResponseSocket);
  //   };
  // }, []);

  // useEffect(() => {
  //   const backend = "http://" + localStorage.getItem("backend") + ".local:4000";
  //   const printingStartedSocket = () => {
  //     console.log("printingStarted");
  //     // setHeating(true);
  //   };
  //   if (location.state?.message === "fileUploaded") {
  //     getSocket().on("printingStarted", printingStartedSocket);

  //     dispatch({ type: IS_PAUSED, payload: false });
  //     // setIsPaused(false);
  //     get(backend, "/getPrintData/preview")
  //       .then((res) => res.json())
  //       .then((res) => {
  //         dispatch({ type: PREVIEW, payload: res.data });

  //         // setPreview(res.data);
  //       });
  //     get(backend, "/getPrintData/name")
  //       .then((res) => res.json())
  //       .then((res) => {
  //         dispatch({ type: FILE_NAME, payload: res.data });

  //         // setFileName(res.data);
  //       });
  //   }
  //   return () => {
  //     setTimeout(() => {
  //       getSocket().off("printingStarted", printingStartedSocket);
  //     }, 30000);
  //   };
  // }, [location.state?.message]);

  // useEffect(() => {
  //   dispatch({
  //     type: PROG,
  //     payload: state.progress
  //       ? !(Object.keys(state.progress).length === 0)
  //       : false,
  //   });
  //   // setProg(progress ? !(Object.keys(progress).length === 0) : false);
  // }, [state.progress]);

  return (
    <div style={{ width: "100%" }}>
      <JobInfo />
      <div className={styles.cameraAndControls}>
        {state.isPaused ? (
          <Controller backend={state.backend} />
        ) : (
          <PreviewSection />
        )}
        <CameraWindow />
      </div>
    </div>
  );
}

export default JobScreen;

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
        <h3 style={{ textAlign: "center" }}>
          {state.fileName ? state.fileName.split(".")[0] : `Something...?`}
        </h3>
        <span>Created at: {state.createdTime}</span>
      </div>
    </div>
  );
}
