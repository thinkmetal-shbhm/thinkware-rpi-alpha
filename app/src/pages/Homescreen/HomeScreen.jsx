import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeScreen.module.css";
import ImportIcon from "../../assets/Icons/import.png";
// import RecentItems from "../../components/RecentItems/RecentItems";
// import PartPreview from "../../components/PartPreview/PartPreview";
import { StlViewer } from "../../components/PartPreview/StlViewer.modern";
import PartPreview from "../../components/PartPreview/PartPreview";

function HomeScreen() {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  const [volume, setvolume] = useState(0);

  // Function to handle file input change
  function handleFileChange(event) {
    debugger;
    const file = event.target.files[0];
    console.log(inputRef.current);
    console.log(inputRef.current.files);
    // setSelectedFile(file);

    // Call the handleFormSubmit function when a file is selected
    if (file) {
      handleFormSubmit(file);
    }
  }

  // Function to handle form submission
  function handleFormSubmit(file) {
    let selectedFile = file;
    if (selectedFile) {
      const formData = new FormData();
      formData.append("fileToUpload", selectedFile);

      debugger;
      // Send the file to your backend endpoint using fetch or axios
      fetch("http://localhost:4000/api/v1/uploadGcodeFile", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          inputRef.current.value = "";
          console.log(data);

          // setSelectedFile(null)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Handle the case where no file is selected
      console.warn("No file selected.");
    }
  }

  return (
    <>
      <div>
        <div className={styles.Importbtn}>
          <div
            className={styles.OptionItem}
            onClick={(e) => {
              navigate("/slice", { state: { id: 1, message: "file-import" } });
            }}
          >
            <img src={ImportIcon} alt="import" className={styles.importIcon} />
            <div className={styles.OptionText}>
              <h5>Import Project</h5>
              <p>STL model</p>
            </div>
            {/* <form id="fileUploadForm">
              <label
                htmlFor="fileUploadInp"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <input
                  ref={inputRef}
                  id="fileUploadInp"
                  type="file"
                  accept=".gcode,.stl"
                  onInput={handleFileChange}
                />
              </label>
            </form> */}
          </div>
        </div>
      </div>
      <h3 className={styles.heading}>Recent Items</h3>
      <div className={styles.recentItems}>
       <PartPreview url="./benchy.stl" name="benchy-1"/>
       <PartPreview url="./cube.stl"name="cube-1"/>
       <PartPreview url="./cube.stl"name="cube-2"/>
       
      </div>
    </>
  );
}

export default HomeScreen;
