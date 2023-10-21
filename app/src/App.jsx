import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";
import { signInwithGoogle } from "./firebase";

function App() {
  const [user, setUser] = useState();
  const [backend, setBackend] = useState("");

  const [isConnected, setIsConnected] = useState(false);

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
        backend={backend}
        user={user}
        setUser={setUser}
        setIsConnected={setIsConnected}
      />
    </div>
  );
}

export default App;
