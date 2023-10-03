import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SlicerScreen.module.css";

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
    if (selectedElement) {
      setTimeout(() => {
        selectedElement.click();
      }, 3000);
      console.log("clicked");
    }
  }, [selectedElement]);

  return (
    <div className={styles.parent}>
      <iframe
        onLoad={(e) => {
          document.querySelector("#frame").focus();
          console.log("loaded");
          if (location.state?.message === "file-import") {
            setSelectedElement(
              document
                .querySelector("iframe")
                .contentWindow.document.getElementById(location.state.message)
            );
          }
        }}
        onFocus={(e) => {
          console.log("focused");
          console.log(selectedElement);
        }}
        autoFocus
        id="frame"
        src="http://13.127.238.43:8100/kiri/"
        title="slicer"
        className={styles.SlicerFrame}
      ></iframe>
    </div>
  );
}

export default SlicerScreen;
