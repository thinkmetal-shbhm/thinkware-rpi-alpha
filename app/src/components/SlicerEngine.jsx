import React from "react";

import { FileFormats } from "unified-3d-loader";
import { CuraWASM } from "cura-wasm-tkml";
import { resolveDefinition } from "cura-wasm-definitions";
import { post } from "../utils";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";

// Pass an ref as prop for file input, so that file can be accessed outside too.(using ref.current.files[0])
function SlicerEngine({ fileRef, pos }) {
  const [init, setInit] = React.useState(false);
  const [fileName, setFileName] = React.useState(null);
  const [percent, setPercent] = React.useState(null);
  const [gcode, setGcode] = React.useState(null);
  const [elapsed, setElasped] = React.useState(null);
  const [estimatedTime, setEstimatedTime] = React.useState(null);

  const state = React.useContext(Context);
  const navigate = useNavigate();

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
    }
  }, []);

  async function handleDownload(gcode) {
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
      definition: resolveDefinition("creality_ender3"),
      overrides: [
        {
          key: "mesh_position_x",
          value: 0,
        },
        {
          key: "mesh_position_y",
          value: 0,
        },

        // {
        //   key: "mesh_position_x",
        //   value: pos?.x ? pos.x : 0,
        // },
        // {
        //   key: "mesh_position_y",
        //   value: pos?.y ? pos.y : 0,
        // },

        {
          key: "default_material_print_temperature",
          value: 245.0,
        },
        {
          key: "default_material_bed_temperature",
          value: 100.0,
        },
        {
          key: "material_print_temperature_layer_0",
          value: 245.0,
        },
        {
          key: "material_print_temperature",
          value: 245.0,
        },
        {
          key: "material_initial_print_temperature",
          value: 245.0,
        },
        {
          key: "material_final_print_temperature",
          value: 245.0,
        },
        {
          key: "material_bed_temperature_layer_0",
          value: 100.0,
        },
        {
          key: "material_bed_temperature",
          value: 100.0,
        },
      ],
      transfer: true,
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
            onClick={() => {
              handleDownload(gcode?.gcode, gcode?.metadata);

              console.log(state.backend, state.backendFound);

              const enc = new TextDecoder("utf-8");
              const gcodeStr = enc.decode(gcode?.gcode);
              console.log(gcodeStr);
              const gcodeArr = gcodeStr.split("\n");
              console.log(
                "🚀 ~ file: SlicerEngine.jsx:132 ~ SlicerEngine ~ gcodeArr:",
                gcodeArr
              );
              if (state.backendFound) {
                post(state.backend, "/fileUpload/uploadGcodeArray", {
                  data: {
                    name: "name",
                    gcode: gcodeArr,
                  },
                })
                  .then((res) => res.json())
                  .then((resp) => {
                    if (resp.message === "ok") {
                      navigate("/job", {
                        state: {
                          id: 1,
                          message: "fileUploaded",
                          createdTime: resp.createdTime,
                        },
                      });
                    } else {
                      alert(`Error: ${resp.message}`);
                      // setError(resp);
                      setTimeout(() => {
                        // setError(null);
                      }, 3000);
                    }
                  });
              }
            }}
            disabled={!gcode?.gcode}
          >
            Download
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
