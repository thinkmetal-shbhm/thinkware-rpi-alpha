import React from "react";
import * as THREE from "three";
export default function PlaneGeom(props) {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry 
       args={[200, -200]} 
      />
      <meshStandardMaterial color="orange" side={THREE.DoubleSide}/>
    </mesh>
  );
}
