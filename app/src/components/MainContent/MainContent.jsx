import React, { useState } from "react";
import MainContentCSS from "./MainContent.module.css";
import { Route, Routes } from "react-router-dom";
import JobScreen from "../../pages/JobScreen/JobScreen";
import HomeScreen from "../../pages/Homescreen/HomeScreen";
import SlicerScreen from "../../pages/SlicerScreen/SlicerScreen";

function MainContent() {
  const [partName, setPartName] = useState("cube.stl");

  return (
    <div className={MainContentCSS.ContentParent}>
      <Routes>
        <Route path="/" element={<HomeScreen setPartName={setPartName} />} />
        <Route path="/job" element={<JobScreen partName={partName} />} />
        <Route path="/prepare" element={<SlicerScreen />} />
      </Routes>
    </div>
  );
}

export default MainContent;
