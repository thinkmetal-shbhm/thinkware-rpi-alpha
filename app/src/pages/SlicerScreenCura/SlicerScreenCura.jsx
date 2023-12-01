import { OrthographicCamera, OrbitControls, Plane } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BoxHelper, Camera } from "three";

import { Model } from "./Model";
import PlaneGeom from "./Plane";
function SlicerScreenCura() {
  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  

  const Axis = ({ color, rotation, position }) => (
    <mesh rotation={rotation} position={position}>
      <cylinderGeometry args={[0.7, 0.7, 100]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );


  return (
    <div
      className="content-div"
      style={{ height: "70vh", border: "1px solid yellow" }}
    >
      <Canvas style={{ background: "white" }} shadows dpr={[1, 2]}  camera={{ position: [0, 180, 180], near: 0.1, far: 1000 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, -3, 2]} />
        <directionalLight
          intensity={0.5}
          castShadow
          shadow-mapSize-height={1512}
          shadow-mapSize-width={1512}
        />

        {/* New: Axes Helper */}
        {/* <axesHelper args={[100]} position={[-100,0,100]} rotation={[ 0,Math.PI / 2, 0]}/> */}


        <Axis color="red" rotation={[0, 0, 0]} position={[-100, 50, 100]} /> 
        {/* X-axis */}
        <Axis color="green" rotation={[0, 0, Math.PI / 2]} position={[-50, 0, 100]} /> 
        {/* Y-axis */}
        <Axis color="blue" rotation={[Math.PI / 2, 0, 0]} position={[-100, 0, 50]} /> 
        
        {/* Z-axis */}




        <gridHelper args={[200, 40]} />

        <Model
          url={"../../STL/cube.stl"}
          setIsDragging={setIsDragging}
          floorPlane={floorPlane}
       
        />

        {/* <Plane scale={200} rotation-x={-Math.PI / 2} position={[0, 0, 0]} /> */}
        <PlaneGeom/>
        {/* <OrthographicCamera makeDefault position={[0, 50, 80]} near= {0.1} far= {1000}
        zoom={2}
        /> */}

        <OrbitControls 
        minZoom={1} maxZoom={5} 
        enabled={!isDragging} />
      </Canvas>
    </div>
  );
}

export default SlicerScreenCura;
