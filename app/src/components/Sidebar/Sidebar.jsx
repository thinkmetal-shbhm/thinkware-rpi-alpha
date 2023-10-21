import React, { Children, useRef } from "react";
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
import { get } from "../../utils";

function Sidebar({
  user,
  setUser,
  isConnected,
  setIsConnected,
  backend,
  setBackend,
}) {
  const inpRef = useRef(null);
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
        console.log("error signing out:", error);
      });
  }

  function connectionButtonHandler(e) {
    console.log(e);

    get(backend, "/connectionStatus")
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "printer connection found") setIsConnected(true);
      });
  }

  // useEffect(() => {}, [backend]);

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
            <img src={JobImage} alt="job" className={SidebarCSS.MenuImage} />
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
                style={user ? { borderRadius: "50%" } : ""}
                alt=""
              />
              <h5>{user?.displayName.split(" ", 1)}</h5>
              <button
                style={{
                  padding: 0,
                  margin: "0 0.25rem",
                  backgroundColor: "#00000000",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                }}
                onMouseEnter={(e) =>
                  (e.target.firstChild.style["box-shadow"] =
                    "0 10px black inset")
                }
                onMouseLeave={(e) =>
                  (e.target.firstChild.style["box-shadow"] = "none")
                }
                onClick={connectionButtonHandler}
              >
                {isConnected ? (
                  <img
                    src={OnlineIcon}
                    style={{ borderRadius: "50%" }}
                    alt="connected"
                    className={SidebarCSS.badge}
                  />
                ) : (
                  <img
                    src={OfflineIcon}
                    style={{ borderRadius: "50%" }}
                    alt="connected"
                    className={SidebarCSS.badge}
                  />
                )}
              </button>
            </div>
            {!isConnected && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  localStorage.setItem("backend", inpRef.current.value);
                  get(
                    "http://" + inpRef.current.value + ".local:4000",
                    "/connectionStatus"
                  )
                    .then((res) => res.json())
                    .then((res) => {
                      if (res.message === "printer connection found")
                        setIsConnected(true);
                    });
                }}
              >
                <input
                  // value={backend}

                  ref={inpRef}
                  onChange={(e) => {
                    console.log(backend, "[[[[[[[[[[[[[[[[[[[");
                    inpRef.current.value = "raspberrypi";
                    setBackend("http://" + "raspberrypi" + ".local:4000");
                    // setBackend("http://" + e.target.value + ".local:4000");
                    // inpRef.current.value = e.target.value;
                    console.log(
                      "🚀 ~ file: Sidebar.jsx:181 ~ inpRef.current.value:",
                      inpRef.current.value
                    );
                    // get(
                    //   "http://" + e.target.value + ".local:4000",
                    //   "/connectionStatus"
                    // )
                    //   .then((res) => res.json())
                    //   .then((res) => {
                    //     if (res.message === "printer connection found")
                    //       setIsConnected(true);
                    //   });
                  }}
                />
              </form>
            )}
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
