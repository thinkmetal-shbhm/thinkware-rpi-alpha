import React from 'react'
import styles from "./SlicerScreen.module.css"
function SlicerScreen() {
  return (
    <div className={styles.parent}>
       <iframe src="http://13.127.238.43:8100/kiri/"
        title='slicer' frameborder="0" 
        className={styles.SlicerFrame}></iframe>
    </div>
  )
}

export default SlicerScreen