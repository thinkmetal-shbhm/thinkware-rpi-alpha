import React, { useState } from "react";
import "./PartPreview.css"
import styles from "../../pages/Homescreen/HomeScreen.module.css";
import { StlViewer } from "./StlViewer.modern";
function PartPreview({ url, name, timestamp,CSSclass }) {
  const [volume, setvolume] = useState(0);
  console.log(CSSclass);
  return (
    <div className={CSSclass?"jobPreviewCard":styles.recentItemCard}>
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
      />

      <div className={CSSclass?"jobPreviewInfo":styles.recentItemInfo}>
      <h3>{name}.stl</h3>
            <span>Created at: 19:02 PM, 15-04-2023</span>
      </div>
    </div>
  );
}

export default PartPreview;
