import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";
import { signInwithGoogle } from "./firebase";

function App() {
  const [user, setUser] = useState();

  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="App">
      <Sidebar
        user={user}
        setUser={setUser}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      <MainContent
        user={user}
        setUser={setUser}
        setIsConnected={setIsConnected}
      />
    </div>
  );
}

export default App;
