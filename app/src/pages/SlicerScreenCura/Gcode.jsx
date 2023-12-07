import React from 'react'
import { useLoader } from '@react-three/fiber';
import { GCodeLoader } from "three/examples/jsm/loaders/GCodeLoader";
function Gcode({url}) {
    const obj = useLoader(GCodeLoader, url);
 
 
 
 return <mesh 
//  rotation={[-Math.PI / 2, 0, 0]} 
 
  position={[-100,0,80]}
>
  <primitive object={obj}  />
   <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, -3, 2]} />
        <directionalLight
          intensity={0.5}
          castShadow
          shadow-mapSize-height={1512}
          shadow-mapSize-width={1512}
        />
  <meshStandardMaterial color="orange"  /> 
   </mesh>
}


export default Gcode