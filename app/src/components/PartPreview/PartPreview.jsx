import React, { useEffect, useState } from "react";

 import { StlViewer } from "stl-viewer-react";
const PartPreview = ({className,url}) => {
  const [photo, setphoto] = useState("");
  const [volume, setvolume] = useState(0);
  // function getFrame() {
  //   let canvas = document.getElementsByTagName("canvas")[0];

    

  //   return canvas.toDataURL();
  // }

  // const handleOnClick = () => {
  //   setphoto(getFrame());
  // };
  // useEffect(() => {
  //   // setTimeout(()=>{ setphoto(getFrame())},5000)
  //   setphoto(getFrame());
  // }, [volume]);
  return (
    <div className={className}>
     
     
          <StlViewer
            width={150}
            height={150}
            url={url}
             groundColor="rgb(128, 128, 128)"
             objectColor="rgb( 255, 255,0)"
             skyboxColor="rgb(0, 0, 0)"
             gridLineColor="rgb(128, 0, 0)"
            lightColor="rgb(255, 255, 255)"
            volume={setvolume}
            
            // style={{ display: "none" }}
          />
          </div>
          /* {`Volume: ${volume}`} */
    

        /* <div border="5px">
          <h3>Photo</h3>
          <img src={photo} alt="stl" />
        </div> */
      
      /* <button onClick={handleOnClick}>Take Photo</button> */
    /* </div> */
  );
};

export default PartPreview;
