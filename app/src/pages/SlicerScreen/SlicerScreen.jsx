import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SlicerScreen.module.css";

function SlicerScreen() {
  const [selectedElement, setSelectedElement] = useState(null);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.message === "file-import")
      setSelectedElement(
        document
          .querySelector("iframe")
          .contentWindow.document.getElementById(location.state.message)
      );
  }, []);

  useEffect(() => {
    console.log(selectedElement);
    if (selectedElement) {
      selectedElement.click();
      console.log("clicked");
    }
  }, [selectedElement]);

  return (
    <div className={styles.parent}>
      <iframe
        id="frame"
        src="http://13.127.238.43:8100/kiri/"
        title="slicer"
        className={styles.SlicerFrame}
      ></iframe>
    </div>
  );
}

export default SlicerScreen;
