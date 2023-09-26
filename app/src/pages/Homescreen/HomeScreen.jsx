import React from 'react'
import styles from "./HomeScreen.module.css"
import ImportIcon from "../../assets/Icons/import.png"
function HomeScreen() {
  return (
    <div className={styles.parent}>
      
          <div className={styles.OptionItem}>
          <img src={ImportIcon} alt="import"className={styles.importIcon} />
            <div className={styles.OptionText}>
                <h5>Import Project</h5>
                <p>STL model</p>
            </div>
        </div>
      
    </div>
  )
}

export default HomeScreen