import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeScreen.module.css";
import ImportIcon from "../../assets/Icons/import.png";
// import RecentItems from "../../components/RecentItems/RecentItems";
// import PartPreview from "../../components/PartPreview/PartPreview";
import { StlViewer } from "../../components/PartPreview/StlViewer.modern";
import PartPreview from "../../components/PartPreview/PartPreview";
import { get, post } from "../../utils";

function HomeScreen({ user, setIsConnected, backend }) {
  const navigate = useNavigate();

  useEffect(() => {
    get(backend, "/connectionStatus")
      .then((res) => res.json())
      .then((res) =>
        res.message === "printer connection found"
          ? setIsConnected(true)
          : setIsConnected(false)
      );
  }, []);

  return (
    <>
      <div>
        <div className={styles.Importbtn}>
          <button
            disabled={!user?.displayName}
            className={styles.OptionItem}
            onClick={(e) => {
              navigate("/prepare", {
                state: { id: 1, message: "file-import" },
              });
            }}
          >
            <img src={ImportIcon} alt="import" className={styles.importIcon} />
            <div className={styles.OptionText}>
              <h5>Import Project</h5>
              <p>STL model</p>
            </div>
          </button>
        </div>
      </div>
      {user?.displayName ? (
        <div>
          <h3 className={styles.heading}>Recent Items</h3>
          <div className={styles.recentItems}>
            <PartPreview url="./benchy.stl" name="benchy-1" />
            <PartPreview url="./cube.stl" name="cube-1" />
            <PartPreview url="./cube.stl" name="cube-2" />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default HomeScreen;
