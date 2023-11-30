import React, { useRef } from "react";
import SlicerEngine from "../../components/SlicerEngine";

function SlicerEnginePage() {
  const fileRef = useRef(null);

  return (
    <React.Fragment>
      <SlicerEngine fileRef={fileRef} />
    </React.Fragment>
  );
}

export default SlicerEnginePage;
