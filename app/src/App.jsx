import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";
import { signInwithGoogle } from "./firebase";

function App() {
  const [user, setUser] = useState();

  return (
   
      <div className="App">
         <Sidebar user={user} setUser={setUser}/>
        <MainContent user={user} setUser={setUser}/>
  
      </div>
   
  );
}

export default App;
