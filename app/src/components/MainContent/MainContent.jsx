import React, { useState } from "react";
import MainContentCSS from "./MainContent.module.css";
import { Route, Routes } from "react-router-dom";
import JobScreen from "../../pages/JobScreen/JobScreen";
import HomeScreen from "../../pages/Homescreen/HomeScreen";
import SlicerScreen from "../../pages/SlicerScreen/SlicerScreen";

function MainContent({
  user,
  setUser,
  setIsConnected,
  backend,
  setCurrentRes,
}) {
  const [partName, setPartName] = useState("cube.stl");

  return (
    <div className={MainContentCSS.ContentParent}>
      <Routes>
        <Route
          path="/"
          element={
            // <HomeScreen
            //   backend={backend}
            //   setPartName={setPartName}
            //   user={user}
            //   setUser={setUser}
            //   setIsConnected={setIsConnected}
            // />
            <SlicerScreen setIsConnected={setIsConnected} backend={backend} />
          }
        />
        <Route
          path="/job"
          element={
            <JobScreen
              setCurrentRes={setCurrentRes}
              partName={partName}
              setIsConnected={setIsConnected}
              backend={backend}
            />
          }
        />
        <Route
          path="/prepare"
          element={
            <SlicerScreen setIsConnected={setIsConnected} backend={backend} />
          }
        />
      </Routes>
    </div>
  );
}

export default MainContent;
