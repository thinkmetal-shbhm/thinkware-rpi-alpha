import React from 'react'
import MainContentCSS from "./MainContent.module.css"
import { Route,Routes } from 'react-router-dom'
import JobScreen from '../../pages/JobScreen/JobScreen'
import HomeScreen from '../../pages/Homescreen/HomeScreen'
import SlicerScreen from '../../pages/SlicerScreen/SlicerScreen'
function MainContent() {
  return (
  <div className={MainContentCSS.ContentParent}>
     <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/job" element={<JobScreen/>} />
        <Route path="/slice" element={<SlicerScreen />} />
      </Routes>
  </div>
  )
}

export default MainContent