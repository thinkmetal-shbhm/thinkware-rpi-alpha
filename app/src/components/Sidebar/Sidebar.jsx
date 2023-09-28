import React from "react";
import SidebarCSS from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import UserIcon from "../../assets/Icons/user.png";
import DashboardImage from "../../assets/Icons/dashboard.png";
import JobImage from "../../assets/Icons/job.png";
import SliceImage from "../../assets/Icons/slice.png";
function Sidebar() {
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
          <NavLink
            to="/slice"
            className={({ isActive }) =>
              isActive ? SidebarCSS.activeList : SidebarCSS.pageItem
            }
          >
            <img
              src={SliceImage}
              alt="dashboard"
              className={SidebarCSS.MenuImage}
            />
       <span className={SidebarCSS.MenuText}>Slice</span>
          </NavLink>
        </div>
      </div>
      <div className={SidebarCSS.UserAccount}>
        <div className={SidebarCSS.UserInfo}>
          <img src={UserIcon} alt="" />
          <h5>John Doe</h5>
        </div>
        <button className={SidebarCSS.Logoutbtn}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
