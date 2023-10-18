import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SlicerScreen.module.css";
import { ObserveIFrame, get, post } from "../../utils";

function SlicerScreen({ setIsConnected }) {
  const [selectedElement, setSelectedElement] = useState(null);
  const [kiriLS, setKiriLS] = useState(null);
  const [ready, setReady] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    get("/connectionStatus")
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
      console.log("receiver msg ---------------", e);
      if (e.data == "ok") {
        clearInterval(temp);
        setReady(true);
        setKiriLS(document.querySelector("#frame").contentWindow.localStorage);
      } else if (e.data == "print") {
        exportIntervals();
      }
    });
    return () => {
      clearInterval(temp);
    };
  }, []);
  useEffect(() => {
    console.log(ready);
    if (ready && location.state.message === "file-import") {
      document.querySelector("#frame").contentWindow.postMessage("import", "*");
      console.log("import file");
    }
  }, [ready]);

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

  function exportIntervals() {
    const fileNameInterval = setInterval(() => {
      const file = kiriLS.getItem("current_files");
      if (file) {
        sessionStorage.setItem("current_files", file);

        post("/uploadPrintData/name", { name: file })
          .then((res) => res.json())
          .then((res) => {
            if (res.message === "uploaded") kiriLS.removeItem("current_files");
          });
        clearInterval(fileNameInterval);
      }
    }, 300);

    const previewInterval = setInterval(() => {
      const partPreview = kiriLS.getItem("plate_preview");

      if (partPreview) {
        sessionStorage.setItem("plate_preview", partPreview);

        post("/uploadPrintData/preview", { img: partPreview })
          .then((res) => res.json())
          .then((res) => {
            if (res.message === "uploaded") kiriLS.removeItem("plate_preview");
          });
        clearInterval(previewInterval);
      }
    }, 300);

    const gcodeInterval = setInterval(() => {
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
            // document
            //   .querySelector("iframe")
            //   .contentWindow.document.querySelector("#context-clear-workspace")
            //   .click();
            setTimeout(() => {
              console.log("sent message");
              document
                .querySelector("iframe")
                .contentWindow.postMessage("import", "*");
            }, 3000);

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
