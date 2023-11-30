import React, { useRef, useEffect, useContext } from "react";
import SidebarCSS from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import UserIcon from "../../assets/Icons/user.png";
import DashboardImage from "../../assets/Icons/dashboard.png";
import JobImage from "../../assets/Icons/job.png";
import OnlineIcon from "../../assets/Icons/online.png";
import OfflineIcon from "../../assets/Icons/offline.png";
import PrepareImage from "../../assets/Icons/prepare.png";

import jwt_decode from "jwt-decode";
import { auth, provider, signInwithGoogle } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { get } from "../../utils";
import { setSocket } from "../../socket";
import { BACKEND, BACKEND_FOUND, CONNECTED } from "../../constants/actions";
import { Context, DispatchCtx } from "../../Context";

function Sidebar({ user, setUser }) {
  const inpRef = useRef(null);

  const state = useContext(Context);
  const dispatch = useContext(DispatchCtx);

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

    get(state.backend, "/connectionStatus")
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "printer connection found") {
          dispatch({ type: CONNECTED, payload: true });
          // setIsConnected(true);
        }
      });
  }

  // useEffect(() => {}, [backend]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [user?.displayName]);

  useEffect(() => {
    if (import.meta.env.VITE_NODE_ENV === "production") {
      localStorage.setItem("backend", import.meta.env.VITE_BACKEND_URL);
      get(`${import.meta.env.VITE_BACKEND_URL}`, "/connectionStatus")
        .then((res) => res.json())
        .then((res) => {
          if (res.status !== 404) {
            setSocket(state.backend);
            dispatch({
              type: BACKEND_FOUND,
              payload: true,
            });
          }
          if (res.message === "printer connection found") {
            dispatch({
              type: CONNECTED,
              payload: true,
            });
            // setIsConnected(true);
          }
        });
    }
  }, []);

  return (
    <div className={SidebarCSS.SidebarParent}>
      <div>
        <div className={SidebarCSS.appname}>
          <h3>Thinkware</h3>
        </div>
        <div className={SidebarCSS.appnameMobile}>
          <h3>tw</h3>
        </div>

        <div className={SidebarCSS.pageList}>
          {/* <NavLink
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
          </NavLink> */}
          <NavLink
            to="/"
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
          <NavLink
            to="/engine"
            className={({ isActive }) =>
              isActive ? SidebarCSS.activeList : SidebarCSS.pageItem
            }
          >
            <img src={JobImage} alt="engine" className={SidebarCSS.MenuImage} />
            <span className={SidebarCSS.MenuText}>Engine</span>
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
                {state.isConnected ? (
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
            {!state.isConnected && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (import.meta.env.VITE_NODE_ENV === "production") {
                    localStorage.setItem("backend", inpRef.current.value);
                    get(
                      "http://" + inpRef.current.value + ".local:4000",
                      "/connectionStatus"
                    )
                      .then((res) => res.json())
                      .then((res) => {
                        if (res.status !== 404) {
                          setSocket(state.backend);
                        }
                        if (res.message === "printer connection found") {
                          dispatch({
                            type: CONNECTED,
                            payload: true,
                          });
                          // setIsConnected(true);
                        }
                      });
                  } else {
                    localStorage.setItem("backend", inpRef.current.value);
                    get("http://" + inpRef.current.value, "/connectionStatus")
                      .then((res) => res.json())
                      .then((res) => {
                        if (res.status !== 404) {
                          setSocket(state.backend);
                        }
                        if (res.message === "printer connection found") {
                          dispatch({
                            type: CONNECTED,
                            payload: true,
                          });
                          // setIsConnected(true);
                        }
                      });
                  }
                }}
              >
                <input
                  ref={inpRef}
                  onChange={(e) => {
                    inpRef.current.value = e.target.value;

                    if (import.meta.env.VITE_NODE_ENV === "production") {
                      dispatch({
                        type: BACKEND,
                        payload: "http://" + e.target.value + ".local:4000",
                      });
                      // setBackend("http://" + e.target.value + ".local:4000");
                    } else {
                      dispatch({
                        type: BACKEND,
                        payload: "http://" + e.target.value,
                      });
                      // setBackend("http://" + e.target.value);
                    }
                    console.log(
                      "🚀 ~ file: Sidebar.jsx:210 ~ inpRef.current.value:",
                      inpRef.current.value
                    );
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
