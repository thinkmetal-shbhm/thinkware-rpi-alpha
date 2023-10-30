import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";
import { signInwithGoogle } from "./firebase";
import { createPortal } from "react-dom";
import InfoPortal from "./components/InfoPortal";

function App() {
  const [user, setUser] = useState();
  const [backend, setBackend] = useState("");

  const [modal, setModal] = useState(null);

  const [currentRes, setCurrentRes] = useState(null);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (currentRes && currentRes?.indexOf("cold extrusion prevented") !== -1) {
      setModal(currentRes + ", Please Restart the printer.");
    }
  }, [currentRes]);

  useEffect(() => {
    console.log("+++++++++++++++++", backend, "\n+++++++++++++++");
  }, [backend]);

  return (
    <div className="App">
      <Sidebar
        backend={backend}
        setBackend={setBackend}
        user={user}
        setUser={setUser}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      <MainContent
        setCurrentRes={setCurrentRes}
        backend={backend}
        user={user}
        setUser={setUser}
        setIsConnected={setIsConnected}
      />
      {modal &&
        createPortal(
          <InfoPortal msg={modal} closeCb={(e) => setModal(null)} />,
          document.querySelector("#portalInfo")
        )}
    </div>
  );
}

export default App;
