import React, { useEffect, useState } from "react";
import styles from "./SlicerScreen.module.css";

function SlicerScreen() {
  const [innerWindow, setInnerWindow] = useState(null);

  // useEffect(() => {
  //   setInnerWindow(document.getElementById("frame").contentWindow);
  // }, []);

  useEffect(() => {
    // if (innerWindow) {
    //   console.log("innerwindow click");
    //   debugger;
    //   innerWindow.onload = function () {
    // debugger;
    setTimeout(() => {
      document.getElementById("file-import").click();
    }, 10000);
    // };
  }, []);
  return (
    <div className={styles.parent}>
      {/* <iframe
        id="frame"
        src="http://13.127.238.43:8100/kiri/"
        title="slicer"
        className={styles.SlicerFrame}
      ></iframe>
      <button
        onClick={(e) => {
          console.log(document.getElementById("container"));
          console.log(document.getElementById("file-import"));
          console.log(document.getElementById("load-file"));
          document.getElementById("load-file").click();
        }}
      >
        import
      </button> */}
    </div>
  );
}

export default SlicerScreen;
