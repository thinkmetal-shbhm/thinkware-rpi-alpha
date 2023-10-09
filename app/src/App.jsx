import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";
import { signInwithGoogle } from "./firebase";

function App() {
  const [user, setUser] = useState({});
  const login = () => {
    console.log("clicked login");
setUser({"name":"Prashant"})
console.log( localStorage.getItem("name"));
     signInwithGoogle();
  };
  return (
   
      <div className="App">
         <Sidebar />
        <MainContent />
  
      </div>
   
  );
}

export default App;
