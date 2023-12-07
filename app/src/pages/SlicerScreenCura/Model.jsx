// todo: 
//set position wrt to origin at bottom left as state
//bounding box


import { useLoader, useThree } from "@react-three/fiber";
import {useState, useEffect, useRef } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
// import Plane from "./Plane";
import { Plane, useTexture } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";

import * as THREE from "three";


export const Model = ({ url ,setIsDragging, floorPlane}) => {
  const matcap=useTexture("./matcaps/matcap.png");
  const geom = useLoader(STLLoader, url);

// console.log("stl",geom);
const meshRef = useRef();


// drag function start

const [pos, setPos] = useState([0, 0.1, 0]);
const [modelSize,setModelSize]=useState([0,0,0]);
const [modelPos,setModelPos]=useState([0,0,0])
const [defaultScale,setDefaultScale]=useState([1.2,1.2,1.26])
const { size, viewport } = useThree();
const aspect = size.width / viewport.width;

let planeIntersectPoint = new THREE.Vector3();

const dragObjectRef = useRef();


//logging object range and position on board


useEffect(() => {
  if (geom && meshRef.current) {
    const mesh = new THREE.Mesh(geom);
    const bbox = new THREE.Box3().setFromObject(mesh);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    
    console.log("Dimensions (x, y, z):", size.x, size.y, size.z);
    setModelSize([ Math.ceil(+size.x), Math.ceil(+size.y), Math.ceil(+size.z)])
    console.log("Position (x, y, z):", bbox.min.x, bbox.min.y, bbox.min.z);
    setModelPos([ Math.ceil(+bbox.min.x), Math.ceil(+bbox.min.y), Math.ceil(+bbox.min.z)]);
  }
}, [geom]);


const [spring, api] = useSpring(() => ({
   position: [0, 0.1, 0],
   //bed fixed when dragging
   // position: pos,
  // scale: 1,
  // rotation: [0, 0, 0],
  // config: { friction: 0 }
}));
// console.log("size",modelSize);
const minX = -100;
  const maxX = 100-modelSize[0]*defaultScale[0];
  const minZ =  -100+modelSize[1]*defaultScale[1];
  const maxZ = 100;

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);

        // Modified: Confine the position within the specified bounds
        const confinedX = Math.max(minX, Math.min(maxX, planeIntersectPoint.x));
        const confinedZ = Math.max(minZ, Math.min(maxZ, planeIntersectPoint.z));

        setPos([confinedX, 0.1, confinedZ]);
      }

    setIsDragging(active);

    api.start({
     // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
        position: pos,
      // scale: active ? 1.2 : 1,
      
    });
    return timeStamp;
  },
  { delay: true }
);


//drag function end


  return (
    
   

    <animated.mesh {...spring} {...bind()} castShadow ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        scale={defaultScale}

       >
        <primitive object={geom} attach="geometry" ref={dragObjectRef}/>
        <meshMatcapMaterial matcap={matcap}  />
        </animated.mesh>

      
   
    
  );
};
