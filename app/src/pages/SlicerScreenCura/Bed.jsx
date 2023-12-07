import { useTexture } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React from 'react'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
function Bed({url}) {
    const matcap=useTexture("./matcaps/matcap.png");
    // const obj = useLoader(OBJLoader, "../../Bed Assembly/Bed assembly v16.obj",(loader) => {
    //     materials.preload();
    //     loader.setMaterials(materials)});
    // return (<mesh>
    //  <primitive object={obj} attach="geometry"/>
    //     <meshMatcapMaterial matcap={matcap}/>
    //  </mesh>);
    const materials = useLoader(MTLLoader, "../../Bed Assembly/Bed assembly v16.mtl");
    const obj = useLoader(OBJLoader, '../../Bed Assembly/Bed assembly v16.obj',(loader) => {
        materials.preload();
        loader.setMaterials(materials);
      });
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,3,-100]}>
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

export default Bed