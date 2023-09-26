import React from 'react'
import styles from "./HomeScreen.module.css"
import ImportIcon from "../../assets/Icons/import.png"
import RecentItems from "../../components/RecentItems/RecentItems"
function HomeScreen() {
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
      <RecentItems/>
    </div>
  )
}

export default HomeScreen