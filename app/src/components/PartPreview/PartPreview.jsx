import React, { useEffect, useState } from "react";
import jobstyles from "./PartPreview.module.css";
import styles from "../../pages/Homescreen/HomeScreen.module.css";
import { StlViewer } from "./StlViewer.modern";

function PartPreview({ url, name, timestamp, CSSclass, fileName }) {
  const [volume, setvolume] = useState(0);

  return (
    <div
      className={CSSclass ? jobstyles.jobPreviewCard : styles.recentItemCard}
      style={{ textAlign: "center" }}
    >
      <StlViewer
        width={100}
        height={100}
        url={url}
        groundColor="rgb(128, 128, 128)"
        objectColor="rgb( 255, 255,0)"
        skyboxColor="rgb(0, 0, 0)"
        gridLineColor="rgb(128, 0, 0)"
        lightColor="rgb(255, 255, 255)"
        volume={setvolume}
        id={`canvas${name}`}
        className={CSSclass ? jobstyles.jobCanvas : styles.Canvas}
      />

      <div
        className={CSSclass ? jobstyles.jobPreviewInfo : styles.recentItemInfo}
      >
        <h3
          style={{
            textAlign: "center",
            fontSize: "",
          }}
        >
          {fileName ? fileName.split(".")[0] : `${name}`}
        </h3>
        <span>Created at: 19:02 PM, 15-04-2023</span>
      </div>
    </div>
  );
}

export default PartPreview;
