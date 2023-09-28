import React, { useState } from 'react'
import styles from "./HomeScreen.module.css"
import ImportIcon from "../../assets/Icons/import.png"
import PartPreview from "../../components/PartPreview/PartPreview"
import { StlViewer } from '../../components/PartPreview/StlViewer.modern'
function HomeScreen() {
  const [volume, setvolume] = useState(0);
  return (
    <div>
    <div className={styles.parent}>
      
          <div className={styles.OptionItem}>
          <img src={ImportIcon} alt="import"className={styles.importIcon} />
            <div className={styles.OptionText}>
                <h5>Import Project</h5>
                <p>STL model</p>
            </div>
        </div>
      
    </div>
    <h3 className={styles.heading}>Recent Items</h3>
    <div className={styles.recentItems}>
      
    <div className={styles.recentItemCard}>
    <StlViewer
            width={100}
            height={100}
            url="/benchy.stl"
             groundColor="rgb(128, 128, 128)"
             objectColor="rgb( 255, 255,0)"
             skyboxColor="rgb(0, 0, 0)"
             gridLineColor="rgb(128, 0, 0)"
            lightColor="rgb(255, 255, 255)"
            volume={setvolume}
            id="canvas1"

          />


      <div className={styles.recentItemInfo}>
        <h3>Benchy.stl</h3>
        <span>Created at: 09:02 AM, 13-04-2023</span>
      </div>
      </div>


      <div className={styles.recentItemCard}>
      <StlViewer

            width={100}
            height={100}
            url="/cube.stl"
             groundColor="rgb(128, 128, 128)"
             objectColor="rgb( 255, 255,0)"
          
            skyboxColor="rgb(0, 0, 0)"
             gridLineColor="rgb(128, 0, 0)"
            lightColor="rgb(255, 255, 255)"
            volume={setvolume} 
            id="canvas2"
            />
      <div className={styles.recentItemInfo}>
        <h3>Cube.stl</h3>
        <span>Created at: 19:02 PM, 15-04-2023</span>
      </div>
      </div>
      <div className={styles.recentItemCard}>
      <StlViewer

            width={100}
            height={100}
            url="/cube.stl"
             groundColor="rgb(128, 128, 128)"
             objectColor="rgb( 255, 255,0)"
          
            skyboxColor="rgb(0, 0, 0)"
             gridLineColor="rgb(128, 0, 0)"
            lightColor="rgb(255, 255, 255)"
            volume={setvolume} 
            id="canvas3"
            />
      <div className={styles.recentItemInfo}>
        <h3>Cube(1).stl</h3>
        <span>Created at: 19:02 PM, 15-04-2023</span>
      </div>
      </div>
      </div>
    </div>
  )
}

export default HomeScreen