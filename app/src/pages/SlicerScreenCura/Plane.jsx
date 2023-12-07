import React from "react";
import * as THREE from "three";
export default function PlaneGeom(props) {
  return (
    <mesh position={[0, 0, 20]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry 
       args={[200, -160]} 
      />
      {/* <meshStandardMaterial  side={THREE.DoubleSide}/> */}
    </mesh>
  );
}
