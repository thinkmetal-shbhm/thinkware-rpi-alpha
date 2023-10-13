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

import jwt_decode from "jwt-decode";
import { auth, provider, signInwithGoogle } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

function Sidebar({user,setUser}) {
  const [isConnected, setIsConnected] = useState(false);
 

  console.log("user", user);
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;

        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  function handleSignout(e) {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser();
        localStorage.setItem("user", JSON.stringify({}));
        console.log("userSignedout");
      })
      .catch((error) => {
        // An error happened.
        console.log("error signing out");
      });
  }

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/connected")
      .then((response) => response.json())
      .then(({ message, data }) =>
        setIsConnected(message === "connected" && data?.fd ? true : false)
      );

    console.log("printer connected", isConnected);
  }, [isConnected]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [user?.displayName]);

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
              alt="job"
              className={SidebarCSS.MenuImage}
            />
            <span className={SidebarCSS.MenuText}>Job</span>
          </NavLink>
        </div>
      </div>

      <>
        {/* loggedin */}

        {user?.displayName ? (
          <div className={SidebarCSS.UserAccount}>
            <div className={SidebarCSS.UserInfo}>
              <img
                referrerPolicy="no-referrer"
                src={user ? user?.photoURL : UserIcon}
                alt=""
              />
              <h5>{user?.displayName.split(" ", 1)}</h5>
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
            <button
              className={SidebarCSS.Logoutbtn}
              onClick={(e) => handleSignout(e)}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className={SidebarCSS.LoginBtn}>
            <button className={SidebarCSS.Logoutbtn} onClick={signIn}>
              Login with Google
            </button>
          </div>
        )}
      </>
    </div>
  );
}

export default Sidebar;
