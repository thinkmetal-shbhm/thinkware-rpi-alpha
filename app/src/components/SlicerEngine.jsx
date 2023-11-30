import React from "react";

import { FileFormats } from "unified-3d-loader";
import { CuraWASM } from "cura-wasm-tkml";
import { resolveDefinition } from "cura-wasm-definitions";

// Pass an ref as prop for file input, so that file can be accessed outside too.(using ref.current.files[0])
function SlicerEngine({ fileRef }) {
  const [init, setInit] = React.useState(false);
  const [fileName, setFileName] = React.useState(null);
  const [percent, setPercent] = React.useState(null);
  const [gcode, setGcode] = React.useState(null);
  const [elapsed, setElasped] = React.useState(null);
  const [estimatedTime, setEstimatedTime] = React.useState(null);

  React.useEffect(() => {
    if (!init) {
      setInit(true);

      //Update file input accept attribute
      const extensions = [];
      // for (const format of Object.values(FileFormats)) {
      //   extensions.push(
      //     ...format.extensions.map((extension) => `.${extension}`)
      //   );
      // }

      extensions.push(".stl");
      document.getElementById("upload").accept = extensions;

      window.transferFile = true;
    }
  }, []);

  async function handleFinish(gcode) {
    //Create the download link and download the file
    const blob = new Blob([gcode], {
      type: "text/plain",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Output.gcode";
    link.click();
    link.remove();
  }

  async function fileSubmit(e) {
    //Get the file
    const file = fileRef.current.files[0];
    const bytes = await file.arrayBuffer();
    const extension = file.name.split(".").pop();

    //Create a slicer
    const slicer = new CuraWASM({
      command: window.command,
      definition: resolveDefinition("ultimaker2"),
      overrides: window.overrides,
      transfer: window.transferFile,
    });

    //Add progress handler
    slicer.on("progress", (percent) => setPercent(percent));

    //Slice
    const start = Date.now();
    const { gcode, metadata } = await slicer.slice(bytes, extension);
    setGcode({ gcode, metadata });
    const end = Date.now();

    console.log(metadata);

    //Calculate elapsed time
    const _elapsed = new Date(end - start);
    setElasped(_elapsed);

    //Format estimated time
    const _estimatedTime = `${Math.floor(
      metadata.printTime / 3600
    )}h ${Math.floor((metadata.printTime % 3600) / 60)}m ${Math.floor(
      (metadata.printTime % 3600) % 60
    )}s`;
    setEstimatedTime(_estimatedTime);

    //Cleanup
    await slicer.destroy();
  }

  return (
    <div style={{ width: "400px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          style={{ padding: "0.25rem 0.5rem", margin: "0.25rem 1rem" }}
          onClick={(e) => upload.click()}
        >
          Import
          <input
            id="upload"
            type="file"
            ref={fileRef}
            onChange={(e) => {
              if (fileRef?.current?.files[0]) {
                setFileName(fileRef?.current?.files[0].name);
                setGcode(null);
              }
            }}
          />
        </button>
        <span>
          <button
            onClick={fileSubmit}
            style={{ padding: "0.25rem 0.5rem", margin: "0.25rem 1rem" }}
            disabled={!fileName}
          >
            Slice
          </button>
          <button
            style={{ padding: "0.25rem 0.5rem", margin: "0.25rem 1rem" }}
            onClick={() => handleFinish(gcode?.gcode, gcode?.metadata)}
            disabled={!gcode?.gcode}
          >
            download
          </button>
        </span>
      </div>
      <br />
      <div>
        <progress
          value={percent || "0"}
          max="100"
          style={{ overflow: "hidden" }}
        ></progress>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <span>{fileRef.current?.files[0]}</span> */}
          <span style={{ margin: "0.25rem 0.5rem" }}>{fileName || ""}</span>
          <span style={{ margin: "0.25rem 0.5rem" }}>{percent || "0"}%</span>
        </div>
      </div>

      {gcode?.metadata && (
        <div>
          <h4>Metadata: </h4>

          {gcode?.metadata && elapsed && estimatedTime ? (
            <>
              <div>{`Elapsed time: ${elapsed.valueOf()}ms`}</div>
              <div>{`GCODE flavor: ${gcode.metadata.flavor}`}</div>
              <div>{`Estimated print time: ${estimatedTime}`}</div>
              <div>{`Nozzle Size: ${gcode.metadata.nozzleSize}mm `}</div>
              <div>{`Filament Usage: ${gcode.metadata.filamentUsage}mm³ `}</div>
              <div>{`Material 1 usage: ${gcode.metadata.material1Usage}mm³`}</div>
              <div>{`Material 2 usage: ${gcode.metadata.material2Usage}mm³`}</div>
            </>
          ) : (
            "N/A"
          )}
        </div>
      )}
      {/* <input
              disabled
              id="download"
              value="Download GCODE"
              type="button"
            /> */}
    </div>
  );
}

export default SlicerEngine;
