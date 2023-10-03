import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SlicerScreen.module.css";
import { Observe, ObserveIFrame, waitForElm } from "../../utils";

function SlicerScreen() {
  const [selectedElement, setSelectedElement] = useState(null);

  const location = useLocation();

  // useEffect(() => {
  //   const ele = document
  //     .querySelector("iframe")
  //     .contentWindow.document.getElementById(location.state?.message);
  //   console.log(ele);
  //   if (location.state?.message === "file-import")
  //     if (ele) setSelectedElement(ele);
  // }, []);

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
  }, [selectedElement]);

  return (
    <div className={styles.parent}>
      <iframe
        onLoad={(e) => {
          document.querySelector("#frame").focus();
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
        }}
        onFocus={(e) => {
          console.log("focused");
          console.log(selectedElement);
        }}
        autoFocus
        id="frame"
        src="http://localhost:8100/kiri/"
        title="slicer"
        className={styles.SlicerFrame}
      ></iframe>
    </div>
  );
}

export default SlicerScreen;
