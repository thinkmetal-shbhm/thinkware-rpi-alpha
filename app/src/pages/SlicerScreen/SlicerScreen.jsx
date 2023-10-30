import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SlicerScreen.module.css";
import { ObserveIFrame, get, post } from "../../utils";
import InfoPortal from "../../components/InfoPortal";

function SlicerScreen({ setIsConnected, backend }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const DataForBackend = (e, temp) => {
    const backend = "http://" + localStorage.getItem("backend") + ".local:4000";
    console.log(
      "🚀 ~ file: SlicerScreen.jsx:30 ~ window.addEventListener ~ backend:",
      backend
    );
    console.log("receiver msg ---------------", e);
    if (e.data == "ok") {
      clearInterval(temp);
      setReady(true);
      // setKiriLS(document.querySelector("#frame").contentWindow.localStorage);
    } else if (e.data?.gcode) {
      console.log(
        "🚀 ~ file: SlicerScreen.jsx:39 ~ window.addEventListener ~ backend:",
        backend
      );
      post(backend, "/fileUpload/uploadGcodeArray", {
        data: {
          name: "name",
          gcode: e.data?.gcode,
        },
      })
        .then((res) => res.json())
        .then((resp) => {
          // setBtnClicked(false);
          if (resp.message === "ok") {
            // kiriLS.removeItem("tw__gcode");
            navigate("/job", {
              state: {
                id: 1,
                message: "fileUploaded",
                createdTime: resp.createdTime,
              },
            });
          } else {
            alert(`Error: ${resp.message}`);
            setError(resp);
            setTimeout(() => {
              setError(null);
            }, 3000);
          }
        });
    } else if (e.data?.plate_preview) {
      console.log(backend + "===========");
      post(backend, "/uploadPrintData/preview", {
        img: e.data?.plate_preview,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "uploaded")
            console.log("plate preview file uploaded", e.data?.plate_preview);
          // kiriLS.removeItem("plate_preview");
        });
    } else if (e.data?.current_files) {
      post(backend, "/uploadPrintData/name", { name: e.data?.current_files })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "uploaded")
            console.log("uploaded", e.data?.current_files);
          //  kiriLS.removeItem("current_files");
        });
    }
  };

  useEffect(() => {
    get(backend, "/connectionStatus")
      .then((res) => res.json())
      .then((res) =>
        res.message === "printer connection found"
          ? setIsConnected(true)
          : setIsConnected(false)
      );
    let temp = setInterval(() => {
      document.querySelector("#frame").contentWindow.postMessage("check", "*");
    }, 500);

    window.addEventListener("message", (e) => {
      DataForBackend(e, temp);
    });
    return () => {
      clearInterval(temp);
    };
  }, []);

  useEffect(() => {
    console.log(ready);
    if (ready && location.state?.message === "file-import") {
      document.querySelector("#frame").contentWindow.postMessage("import", "*");
      console.log("import file");
    }
  }, [ready]);

  return (
    <div className={styles.parent}>
      <iframe
        autoFocus
        id="frame"
        // src="https://kiri.thinkmetal.co.in/kiri/"
        src="http://raspberrypi.local:8100/kiri"
        title="slicer"
        className={styles.SlicerFrame}
      ></iframe>
      {error &&
        createPortal(
          <InfoPortal
            msg={error?.message}
            closeCb={(e) => {
              setError(null);
            }}
          />,
          document.querySelector("#portalInfo")
        )}
    </div>
  );
}

export default SlicerScreen;
