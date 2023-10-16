import React, { useState } from "react";
import MainContentCSS from "./MainContent.module.css";
import { Route, Routes } from "react-router-dom";
import JobScreen from "../../pages/JobScreen/JobScreen";
import HomeScreen from "../../pages/Homescreen/HomeScreen";
import SlicerScreen from "../../pages/SlicerScreen/SlicerScreen";

function MainContent({ user, setUser, setIsconnected }) {
  const [partName, setPartName] = useState("cube.stl");

  return (
    <div className={MainContentCSS.ContentParent}>
      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen
              setPartName={setPartName}
              user={user}
              setUser={setUser}
              setIsconnected={setIsconnected}
            />
          }
        />
        <Route
          path="/job"
          element={
            <JobScreen partName={partName} setIsconnected={setIsconnected} />
          }
        />
        <Route
          path="/prepare"
          element={<SlicerScreen setIsconnected={setIsconnected} />}
        />
      </Routes>
    </div>
  );
}

export default MainContent;
