import React, { useContext, useEffect } from "react";
import MainContentCSS from "./MainContent.module.css";
import JobScreen from "../../pages/JobScreen/JobScreen";

import { getSocket } from "../../socket";
import { get, secondsToDDHHMM } from "../../utils";
import { Context, DispatchCtx } from "../../Context";
import {
  BACKEND,
  BACKEND_FOUND,
  BED_PERCENT,
  CONNECTED,
  CREATED_TIME,
  CURRENT_RES,
  ESTIMATED_END,
  EXT_PERCENT,
  FILE_NAME,
  HEATING,
  IS_PAUSED,
  PERCENT,
  PREVIEW,
  PROG,
  PROGRESS,
  REMAINING_TIME,
  SOCKET_CONNECTED,
  TEMP,
} from "../../constants/actions";

function MainContent({ setIsConnected, backend }) {
  const state = useContext(Context);
  const dispatch = useContext(DispatchCtx);

  useEffect(() => {
    const onConnect = () => {
      dispatch({ type: SOCKET_CONNECTED, payload: true });
      dispatch({
        type: BACKEND,
        payload: `${import.meta.env.VITE_BACKEND_URL}`,
      });
    };
    const onDisconnect = () => {
      dispatch({ type: SOCKET_CONNECTED, payload: false });
      dispatch({
        type: BACKEND_FOUND,
        payload: false,
      });
    };

    const tempSocket = (data) => dispatch({ type: TEMP, payload: data });
    const printerResponseSocket = (data) =>
      dispatch({ type: CURRENT_RES, payload: data });
    const progressSocket = (data) => {
      dispatch({ type: PROGRESS, payload: JSON.parse(data).data?.progress });
    };

    if (state.backendFound) {
      getSocket().on("connect", onConnect);
      getSocket().on("disconnect", onDisconnect);

      if (getSocket()?.connected) {
        getSocket().on("tempReport", tempSocket);
        getSocket().on("progress", progressSocket);
        getSocket().on("printerResponse", printerResponseSocket);
      }

      get(state.backend, "/progress")
        .then((res) => res.json())
        .then((res) => {
          console.log("🚀 ~ file: JobScreen.jsx:63 ~ .then ~ res:", res);
        });

      get(state.backend, "/getPrintData/preview")
        .then((res) => res.json())
        .then((res) => {
          dispatch({ type: PREVIEW, payload: res.data });
        });
      get(state.backend, "/getPrintData/name")
        .then((res) => res.json())
        .then((res) => {
          console.log(
            "🚀 ~ file: JobScreen.jsx:92 ~ .then ~ res.data: stetinngg-dfb-=bpodfb",
            res.data
          );
          dispatch({ type: FILE_NAME, payload: res.data });
        });

      get(state.backend, "/connectionStatus")
        .then((res) => res.json())
        .then((res) =>
          res.message === "printer connection found"
            ? dispatch({ type: CONNECTED, payload: true })
            : dispatch({ type: CONNECTED, payload: false })
        );
    }

    return () => {
      if (getSocket()?.connected && state.socketConnected) {
        getSocket().off("connect", onConnect);
        getSocket().off("disconnect", onDisconnect);
        getSocket().off("progress", progressSocket);
        getSocket().off("printerResponse", printerResponseSocket);
      }
    };
  }, [state.backend]);

  useEffect(() => {
    const backend = "http://" + localStorage.getItem("backend") + ".local:4000";
    const printingStartedSocket = () => {
      console.log("printingStarted");
      dispatch({ type: IS_PAUSED, payload: false });
      get(backend, "/getPrintData/preview")
        .then((res) => res.json())
        .then((res) => {
          dispatch({ type: PREVIEW, payload: res.data });
        });
      get(backend, "/getPrintData/name")
        .then((res) => res.json())
        .then((res) => {
          dispatch({ type: FILE_NAME, payload: res.data });
        });
    };

    if (getSocket()?.connected && state.socketConnected) {
      getSocket().on("printingStarted", printingStartedSocket);
    }

    return () => {
      setTimeout(() => {
        if (getSocket()?.connected && state.socketConnected) {
          getSocket().off("printingStarted", printingStartedSocket);
        }
      }, 30000);
    };
  }, []);

  useEffect(() => {
    dispatch({
      type: PROG,
      payload: state.progress
        ? !(Object.keys(state.progress).length === 0)
        : false,
    });

    console.log(
      "🚀 ~ file: JobInfo.jsx:42 ~ useEffect ~ state.progress:",
      state.progress
    );
    if (state.progress) {
      if (!(Object.keys(state.progress).length === 0)) {
        if (state.progress.currentTime && state.progress.running) {
          const tt = +state.progress.totalETA;
          const ct = state.progress.currentTime;
          const minutes = +ct.split("m")[0] || 0;
          const seconds =
            +ct.slice(ct.indexOf("m") + 1, ct.indexOf("s")).trim() || 0;

          const value = ((minutes * 60 + seconds) / tt) * 100 || 0;
          const remaining = tt - (minutes * 60 + seconds);

          dispatch({ type: PERCENT, payload: `${Math.floor(value)}%` });
          dispatch({
            type: ESTIMATED_END,
            payload:
              tt == 0 && isNaN(tt) ? "Unknown" : `${secondsToDDHHMM(tt)}`,
          });

          dispatch({
            type: REMAINING_TIME,
            payload:
              tt == 0 && isNaN(tt)
                ? "Unknown"
                : `${secondsToDDHHMM(remaining)}`,
          });

          console.log(
            "🚀 ~ file: JobInfo.jsx:58 ~ useEffect ~ tt:",
            tt,
            ct,
            minutes,
            seconds,
            value
          );
        }

        dispatch({ type: IS_PAUSED, payload: state.progress.paused });
        dispatch({ type: HEATING, payload: state.progress.heating });

        console.log(
          "🚀 ~ file: JobInfo.jsx:75 ~ useEffect ~ state.progress.heating:",
          state.progress.heating
        );

        if (state.progress.finished || state.progress.stopped) {
          dispatch({ type: FILE_NAME, payload: null });
        }
        console.log(
          "🚀 ~ file: JobInfo.jsx:71 ~ useEffect ~ state.progress:",
          state.progress
        );
        dispatch({ type: CREATED_TIME, payload: state.progress.createdTime });

        console.log(state.progress.createdTime);
      } else {
        dispatch({ type: IS_PAUSED, payload: true });
      }

      if (state.progress?.stopped) {
        localStorage.removeItem("current_files");
        localStorage.removeItem("plate_preview");
        localStorage.removeItem("tw__gcode");
      }
    } else {
      dispatch({ type: IS_PAUSED, payload: true });
    }
  }, [state.progress]);

  useEffect(() => {
    if (state.prog && !state.heating) {
      dispatch({ type: EXT_PERCENT, payload: "100%" });
      dispatch({ type: BED_PERCENT, payload: "100%" });
    }
  }, [state.temp, state.heating, state.prog]);

  return (
    <div className={MainContentCSS.ContentParent}>
      <JobScreen />
    </div>
  );
}

export default MainContent;
