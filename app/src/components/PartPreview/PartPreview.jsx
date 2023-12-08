import React, { useEffect, useState } from "react";
import jobstyles from "./PartPreview.module.css";

function PartPreview({ url, name, timestamp, CSSclass, fileName }) {
  const [volume, setvolume] = useState(0);

  return (
    <div
      className={CSSclass ? jobstyles.jobPreviewCard : styles.recentItemCard}
      style={{ textAlign: "center" }}
    >
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
