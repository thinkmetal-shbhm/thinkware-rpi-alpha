import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SlicerScreen.module.css";
import { ObserveIFrame, get, post } from "../../utils";

function SlicerScreen({ setIsConnected }) {
  const [selectedElement, setSelectedElement] = useState(null);
  const [kiriLS, setKiriLS] = useState(null);
  const [printBtn, setPrintBtn] = useState(null);
  const [btnClicked, setBtnClicked] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  function clicked() {
    console.log("gcode print btn clicked");

    setBtnClicked(true);
    kiriLS.removeItem("tw__gcode");
  }

  useEffect(() => {
    get("/connectionStatus")
      .then((res) => res.json())
      .then((res) =>
        res.message === "printer connection found"
          ? setIsConnected(true)
          : setIsConnected(false)
      );
  }, []);

  useEffect(() => {
    let gcodeInterval = null;
    let fileNameInterval = null;
    let previewInterval = null;

    if (btnClicked) {
      // kiriLS.removeItem("current_files");
      // kiriLS.removeItem("plate_preview");
      // kiriLS.removeItem("tw__gcode");
      // localStorage.removeItem("current_files");
      // localStorage.removeItem("plate_preview");
      // localStorage.removeItem("tw__gcode");

      fileNameInterval = setInterval(() => {
        const file = kiriLS.getItem("current_files");
        if (file) {
          sessionStorage.setItem("current_files", file);

          post("/uploadPrintData/name", { name: file })
            .then((res) => res.json())
            .then((res) => {
              if (res.message === "uploaded")
                kiriLS.removeItem("current_files");
            });
          clearInterval(fileNameInterval);
        }
      }, 300);

      previewInterval = setInterval(() => {
        const partPreview = kiriLS.getItem("plate_preview");

        if (partPreview) {
          sessionStorage.setItem("plate_preview", partPreview);

          post("/uploadPrintData/preview", { img: partPreview })
            .then((res) => res.json())
            .then((res) => {
              if (res.message === "uploaded")
                kiriLS.removeItem("plate_preview");
            });
          clearInterval(previewInterval);
        }
      }, 300);

      gcodeInterval = setInterval(() => {
        const gcodeLS = kiriLS.getItem("tw__gcode");
        console.log("interval,", gcodeLS.split("\n"));

        if (gcodeLS) {
          sessionStorage.setItem("gcode", gcodeLS);

          post("/fileUpload/uploadGcodeArray", {
            data: {
              name: "name",
              gcode: document
                .querySelector("#frame")
                .contentWindow.localStorage.getItem("tw__gcode"),
            },
          })
            .then((res) => res.json())
            .then((resp) => {
              setBtnClicked(false);
              if (resp.message === "ok") {
                kiriLS.removeItem("tw__gcode");
                navigate("/job", {
                  state: {
                    id: 1,
                    message: "fileUploaded",
                    createdTime: resp.createdTime,
                  },
                });
              } else {
                alert(`Error: ${resp.message}`);
              }
            });
        }
        clearInterval(gcodeInterval);
      }, 300);
    }

    return () => {
      setTimeout(() => {
        clearInterval(gcodeInterval);
        clearInterval(fileNameInterval);
        clearInterval(previewInterval);
      }, 30000);
    };
  }, [btnClicked]);

  useEffect(() => {
    if (printBtn)
      document
        .querySelector("#frame")
        .contentWindow.document.querySelector("#act-export")
        .addEventListener("click", clicked);

    return () => {
      // if (gcode)
      //   document
      //     .querySelector("#frame")
      //     .contentWindow.document.querySelector("#act-export")
      //     .removeEventListener("click", clicked);
    };
  }, [printBtn]);

  useEffect(() => {
    console.log(selectedElement);
    async function initSlicer() {
      ObserveIFrame(
        "#curtain",
        {
          attributesList: ["style"], // Only the "style" attribute
          attributeOldValue: true, // Report also the oldValue
        },
        (mut) => {
          console.log(mut);

          console.log(selectedElement);
          if (location.state?.message === "file-import")
            document
              .querySelector("iframe")
              .contentWindow.document.querySelector("#context-clear-workspace")
              .click();

          if (selectedElement) {
            selectedElement.click();
            console.log("clicked");
          }
        }
      );
    }
    initSlicer();

    return () => {};
  }, [selectedElement, location.state?.message]);

  return (
    <div className={styles.parent}>
      <iframe
        onLoad={(e) => {
          document.querySelector("#frame").focus();
          setKiriLS(
            document.querySelector("#frame").contentWindow?.localStorage
          );
          console.log("loaded");
          console.log("location state", location.state);
          if (location.state?.message === "file-import") {
            console.log(
              document
                .querySelector("iframe")
                .contentWindow.document.getElementById(
                  "context-clear-workspace"
                )
            );
            setSelectedElement(
              document
                .querySelector("iframe")
                .contentWindow.document.getElementById(location.state.message)
            );
          } else setSelectedElement(null);

          setPrintBtn(
            document
              .querySelector("#frame")
              .contentWindow.document.querySelector("#act-export")
          );
        }}
        onFocus={(e) => {
          console.log("focused");
          console.log(selectedElement);
        }}
        autoFocus
        id="frame"
        // src="https://kiri.thinkmetal.co.in/kiri/"
        src="http://localhost:8100/kiri"
        title="slicer"
        className={styles.SlicerFrame}
      ></iframe>
    </div>
  );
}

export default SlicerScreen;
