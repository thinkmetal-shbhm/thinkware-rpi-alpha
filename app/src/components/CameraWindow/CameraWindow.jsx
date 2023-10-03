import React, { useEffect, useRef, useState } from "react";
import styles from "./CameraWindow.module.css";
import { socket } from "../../socket";
import { cameraIcon } from "../../assets/Icons";

function CameraWindow() {
  const [connectionStatus, setConnectionStatus] = useState("notConnected");
  const [video, setVideo] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    if (!video)
      console.log((videoRef.current.src = ""), "-------------------------");
  }, [video]);

  useEffect(() => {
    if (connectionStatus === "notConnected") {
      fetch("http://localhost:4000/api/v1/connected")
        .then((res) => {
          console.log(res);
          if (+res.status === 200) setConnectionStatus("connected");
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function onDisconnect() {
      console.log("disconnected");
    }
    function onFrame(frame) {
      displayFrame(frame);
    }
    const displayFrame = (binaryFrame) => {
      // const frameUrl = binaryFrame;
      // Decode the binary frame (assuming it's in a specific format)
      // For example, you may need to convert it to a Blob or use it as-is depending on your server's encoding
      const blob = new Blob([binaryFrame], { type: "image/jpeg" });

      // Create a URL for the Blob and set it as the video element's source
      const frameUrl = URL.createObjectURL(blob);
      console.log(frameUrl);

      if (videoRef.current) {
        videoRef.current.src = frameUrl;
      }
    };
    const fetchVideoStream = async () => {
      socket.on("connection/connected", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("video/frame", onFrame);
    };

    fetchVideoStream();
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("video/frame", onFrame);
    };
  }, []);

  return (
    <div className={styles.mainWindow}>
      <div className={styles.imgContainer}>
        {video ? (
          <img id="camFeed" className={styles.camFeed} src="" ref={videoRef} />
        ) : (
          <div ref={videoRef}>
            <img
              src={cameraIcon}
              alt="cameraIcon"
              className={styles.cameraIcon}
            />
          </div>
        )}
      </div>
      <div className={styles.options}>
        <span
          onClick={(e) => {
            if (video) {
              socket.emit("video/stop", "stop");
              setVideo(false);
            } else {
              socket.emit("video/start", "start");
              setVideo(true);
            }
          }}
          style={{ cursor: "pointer", padding: "0 0.5rem", height: "100%" }}
        >
          <img src={cameraIcon} alt="cameraIcon" className={styles.cameraBtn} />
        </span>
      </div>
    </div>
  );
}

export default CameraWindow;
