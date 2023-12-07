import React, { useRef, useState } from "react";
import SlicerEngine from "../../components/SlicerEngine";
import SlicerScreenCura from "../SlicerScreenCura/SlicerScreenCura";

function SlicerEnginePage() {
  const fileRef = useRef(null);

  const [fileChoosen, setFileChoosen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const [gcode, setGcode] = useState(null);

  return (
    <React.Fragment>
      <SlicerEngine
        fileRef={fileRef}
        setFileChoosen={setFileChoosen}
        pos={pos}
        setPos={setPos}
        gcode={gcode}
        setGcode={setGcode}
      />
      <SlicerScreenCura
        fileRef={fileRef}
        fileChoosen={fileChoosen}
        setFileChoosen={setFileChoosen}
        gcode={gcode}
        setGcode={setGcode}
      />
    </React.Fragment>
  );
}

export default SlicerEnginePage;
