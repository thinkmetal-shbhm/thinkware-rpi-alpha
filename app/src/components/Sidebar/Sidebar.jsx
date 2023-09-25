import React from "react";
import SidebarCSS from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import UserIcon from "../../assets/user.png";
function Sidebar() {
  return (
    <div className={SidebarCSS.SidebarParent}>
      <div>
        <div className={SidebarCSS.appname}>
          <h3>thinkware</h3>
        </div>

        <div className={SidebarCSS.pageList}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? SidebarCSS.activeList : SidebarCSS.pageItem
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/job"
            className={({ isActive }) =>
              isActive ? SidebarCSS.activeList : SidebarCSS.pageItem
            }
          >
            Job
          </NavLink>
          <NavLink
            to="/slice"
            className={({ isActive }) =>
              isActive ? SidebarCSS.activeList : SidebarCSS.pageItem
            }
          >
            Slice
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
