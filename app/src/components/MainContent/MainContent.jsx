import React, { useContext, useState } from "react";
import MainContentCSS from "./MainContent.module.css";
import { Route, Routes } from "react-router-dom";
import JobScreen from "../../pages/JobScreen/JobScreen";
import HomeScreen from "../../pages/Homescreen/HomeScreen";
import SlicerScreen from "../../pages/SlicerScreen/SlicerScreen";

function MainContent({ setIsConnected, backend }) {
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
        <Route path="/job" element={<JobScreen />} />
      </Routes>
    </div>
  );
}

export default MainContent;
