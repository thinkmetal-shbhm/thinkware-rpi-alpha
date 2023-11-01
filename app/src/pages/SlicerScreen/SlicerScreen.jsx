import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SlicerScreen.module.css";
import { get, post } from "../../utils";
import InfoPortal from "../../components/InfoPortal";
import PartPreview from "../../components/PartPreview/PartPreview";

import homeStyles from "../Homescreen/HomeScreen.module.css";

function SlicerScreen({ setIsConnected, backend }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [slicerModal, setSlicerModal] = useState("none");

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(
      "++++))))))))))))",
      slicerModal !== "none" && slicerModal == "recentItems"
    );
    console.log(
      "++++(((((((((())))))))))",
      slicerModal !== "none" && slicerModal == "allItems"
    );
  }, [slicerModal]);
  const DataForBackend = (e, temp) => {
    const backend =
      "http://" + localStorage.getItem("backend") + import.meta.env.NODE_ENV ===
      "production"
        ? ".local:4000"
        : "";

    console.log("receiver msg ---------------", e);
    if (e.data == "ok") {
      clearInterval(temp);
      setReady(true);
    } else if (e.data?.gcode) {
      post(backend, "/fileUpload/uploadGcodeArray", {
        data: {
          name: "name",
          gcode: e.data?.gcode,
        },
      })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.message === "ok") {
            navigate("/job", {
              state: {
                id: 1,
                message: "fileUploaded",
                createdTime: resp.createdTime,
              },
            });
          } else {
            // alert(`Error: ${resp.message}`);
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
    } else if (e.data == "showRecentItems") {
      console.log(
        "🚀 ~ file: SlicerScreen.jsx:68 ~ DataForBackend ~ e.data:",
        e.data
      );

      setSlicerModal("recentItems");
    } else if (e.data == "showAllItems") {
      console.log(
        "🚀 ~ file: SlicerScreen.jsx:72 ~ DataForBackend ~ e.data:",
        e.data
      );
      setSlicerModal("allItems");
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

    function messageListener(e) {
      DataForBackend(e, temp);
    }

    window.addEventListener("message", messageListener);
    return () => {
      clearInterval(temp);
      window.removeEventListener("message", messageListener);
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
      {slicerModal !== "none" &&
        slicerModal == "recentItems" &&
        createPortal(
          <div
            style={{
              width: "100vw",
              height: "100vh",
              zIndex: 50,
              backgroundColor: "#000000aa",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            onClick={(e) => setSlicerModal("none")}
          >
            <div
              style={{
                padding: "3rem 1.5rem",
                borderRadius: "1rem",
                boxShadow: "0 0 5px #000",
                backgroundColor: "#121212",
                color: "#ccc",
                maxWidth: "90%",
                minWidth: "70%",
                textAlign: "center",
                margin: "auto",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "80",
              }}
            >
              <h3 className={homeStyles.heading}>Recent Items</h3>
              <div className={homeStyles.recentItems}>
                <PartPreview url="./benchy.stl" name="benchy-1" />
                <PartPreview url="./cube.stl" name="cube-1" />
                <PartPreview url="./cube.stl" name="cube-2" />
              </div>
            </div>
          </div>,
          document.querySelector("#portalSlicerScreen")
        )}
      {slicerModal !== "none" &&
        slicerModal == "allItems" &&
        createPortal(
          <div
            style={{
              width: "100vw",
              height: "100vh",
              zIndex: 50,
              backgroundColor: "#000000aa",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            onClick={(e) => setSlicerModal("none")}
          >
            <div
              style={{
                padding: "3rem 1.5rem",
                borderRadius: "1rem",
                boxShadow: "0 0 5px #000",
                backgroundColor: "#121212",
                color: "#ccc",
                maxWidth: "90%",
                minWidth: "70%",
                textAlign: "center",
                margin: "auto",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "80",
              }}
            >
              <h3 className={homeStyles.heading}>All Items</h3>
              <div> Item1</div>
              <div> Item2</div>
              <div> Item3</div>
            </div>
          </div>,
          document.querySelector("#portalSlicerScreen")
        )}
    </div>
  );
}

export default SlicerScreen;
