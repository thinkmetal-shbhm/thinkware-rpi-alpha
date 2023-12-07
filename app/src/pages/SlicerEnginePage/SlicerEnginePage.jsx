import React, { useRef, useState } from "react";
import SlicerEngine from "../../components/SlicerEngine";

function SlicerEnginePage() {
  const fileRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <React.Fragment>
      <SlicerEngine fileRef={fileRef} pos={pos} setPos={setPos} />
    </React.Fragment>
  );
}

export default SlicerEnginePage;
