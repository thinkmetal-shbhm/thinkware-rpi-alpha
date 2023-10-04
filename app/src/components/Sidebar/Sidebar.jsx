import React from "react";
import SidebarCSS from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import UserIcon from "../../assets/Icons/user.png";
import DashboardImage from "../../assets/Icons/dashboard.png";
import JobImage from "../../assets/Icons/job.png";
import OnlineIcon from "../../assets/Icons/online.png";
import OfflineIcon from "../../assets/Icons/offline.png";
import PrepareImage from "../../assets/Icons/prepare.png";
import { useEffect } from "react";
import { useState } from "react";

function Sidebar() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/connected")
      .then((response) => response.json())
      .then(({ message, data }) =>
        setIsConnected(message === "connected" && data?.fd ? true : false)
      );

    console.log(isConnected);
  }, [isConnected]);

  return (
    <div className={SidebarCSS.SidebarParent}>
      <div>
        <div className={SidebarCSS.appname}>
          <h3>thinkware</h3>
        </div>
        <div className={SidebarCSS.appnameMobile}>
          <h3>tw</h3>
        </div>

        <div className={SidebarCSS.pageList}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? SidebarCSS.activeList : SidebarCSS.pageItem
            }
          >
            <img
              src={DashboardImage}
              alt="dashboard"
              className={SidebarCSS.MenuImage}
            />
            <span className={SidebarCSS.MenuText}>Dashboard</span>
          </NavLink>
          <NavLink
            to="/prepare"
            className={({ isActive }) =>
              isActive ? SidebarCSS.activeList : SidebarCSS.pageItem
            }
          >
            <img
              src={PrepareImage}
              alt="prepare"
              className={SidebarCSS.MenuImage}
            />
            <span className={SidebarCSS.MenuText}>Prepare</span>
          </NavLink>
          <NavLink
            to="/job"
            className={({ isActive }) =>
              isActive ? SidebarCSS.activeList : SidebarCSS.pageItem
            }
          >
            <img
              src={JobImage}
              alt="dashboard"
              className={SidebarCSS.MenuImage}
            />
            <span className={SidebarCSS.MenuText}>Job</span>
          </NavLink>
         
        </div>
      </div>
      <div className={SidebarCSS.UserAccount}>
        <div className={SidebarCSS.UserInfo}>
          <img src={UserIcon} alt="" />
          <h5>John Doe</h5>
          {isConnected ? (
            <img
              src={OnlineIcon}
              alt="connected"
              className={SidebarCSS.badge}
            />
          ) : (
            <img
              src={OfflineIcon}
              alt="connected"
              className={SidebarCSS.badge}
            />
          )}
        </div>
        <button className={SidebarCSS.Logoutbtn}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
