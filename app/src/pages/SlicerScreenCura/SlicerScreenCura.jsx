import {
  OrthographicCamera,
  OrbitControls,
  Plane,
  Box,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import Bed from "./Bed";
import Gcode from "./Gcode";

import { Model } from "./Model";
import PlaneGeom from "./Plane";

function SlicerScreenCura({
  fileRef,
  fileChoosen,
  setFileChoosen,
  gcode,
  setGcode,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  useEffect(() => {
    console.log("fileref", fileRef?.current?.files[0]);
    console.log(fileChoosen);
    if (fileRef?.current?.files[0]) {
      const objUrl = window.URL.createObjectURL(fileRef?.current?.files[0]);
      setFile(objUrl);
    }
    if (fileChoosen) {
      setFileChoosen(false);
    }
    return () => {
      URL.revokeObjectURL(file);
      setFile(null);
    };
  }, [fileChoosen]);

  const Axis = ({ color, rotation, position }) => (
    <mesh rotation={rotation} position={position}>
      <cylinderGeometry args={[0.7, 0.7, 30]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );

  return (
    <div
      className="content-div"
      style={{ height: "90vh", border: "1px solid yellow" }}
    >
      <Canvas
        style={{ background: "white" }}
        shadows
        dpr={[1, 2]}
        camera={{
          position: [0, 80, 250],
          near: 0.1,
          far: 10000,
          minZoom: 1,
          maxZoom: 5,
        }}
      >
        {/* <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, -3, 2]} />
        <directionalLight
          intensity={0.5}
          castShadow
          shadow-mapSize-height={1512}
          shadow-mapSize-width={1512}
        /> */}

        <Axis color="blue" rotation={[0, 0, 0]} position={[-100, 15, 100]} />
        {/* X-axis */}
        <Axis
          color="red"
          rotation={[0, 0, Math.PI / 2]}
          position={[-85, 0, 100]}
        />
        {/* Y-axis */}
        <Axis
          color="green"
          rotation={[Math.PI / 2, 0, 0]}
          position={[-100, 0, 85]}
        />

        {/* Z-axis */}

        {/* <gridHelper args={[200, 160]} /> */}
        <gridHelper args={[160, 8]} position={[-20, 0, 20]} />
        <gridHelper args={[160, 8]} position={[20, 0, 20]} />

        {/* <Model
      
          url={"../../STL/cube.stl"}
          setIsDragging={setIsDragging}
          floorPlane={floorPlane}
        
        /> */}
        {file && (
          <Model
            // url={document.getElementById("upload").files[0]}
            // url={fileRef?.current?.files[0]}
            url={file}
            setIsDragging={setIsDragging}
            floorPlane={floorPlane}
          />
        )}
        {/* <Model
      
    url={"../../STL/cube.stl"}
    setIsDragging={setIsDragging}
    floorPlane={floorPlane}
  
  /> */}
        <Bed url={"../../Bed Assembly/Bed assembly v16.obj"} />
        <Gcode url={"../../gcode/3DBenchy-002.gcode"} />
        <PlaneGeom />
        <lineSegments position={[0, 80, 20]}>
          <edgesGeometry
            attach="geometry"
            args={[new THREE.BoxGeometry(200, 160, 160)]}
          />
          <lineBasicMaterial attach="material" color="blue" />
        </lineSegments>

        <OrbitControls minZoom={1} maxZoom={5} enabled={!isDragging} />
      </Canvas>
    </div>
  );
}

export default SlicerScreenCura;
