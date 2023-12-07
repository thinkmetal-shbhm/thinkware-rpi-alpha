import React, { useRef } from "react";
import SlicerEngine from "../../components/SlicerEngine";
import SlicerScreenCura from "../SlicerScreenCura/SlicerScreenCura";

function SlicerEnginePage() {
  const fileRef = useRef(null);

  return (
    <React.Fragment>
      <SlicerEngine fileRef={fileRef} />
      <SlicerScreenCura fileRef={fileRef}/>
    </React.Fragment>
  );
}

export default SlicerEnginePage;
