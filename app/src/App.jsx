import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";
import { signInwithGoogle } from "./firebase";
import { createPortal } from "react-dom";
import InfoPortal from "./components/InfoPortal";
import { stopPrint } from "./printerUtils";

function App() {
  const [user, setUser] = useState();
  const [backend, setBackend] = useState(import.meta.env.BACKEND_URL);

  const [modal, setModal] = useState(null);

  const [currentRes, setCurrentRes] = useState(null);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (currentRes) {
      if (currentRes?.indexOf("cold extrusion prevented") !== -1) {
        setModal(currentRes + ", Please Restart the printer.");
        stopPrint(backend);
      } else if (currentRes?.indexOf("Error:") !== -1) {
        if (currentRes?.indexOf("Printer halted. kill() called!") !== -1)
          setModal(currentRes + " Please Restart the printer.");
        else setModal(currentRes);
        stopPrint(backend);
      }
    }
  }, [currentRes]);

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
