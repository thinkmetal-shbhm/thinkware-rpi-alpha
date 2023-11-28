import { createContext } from "react";
import {
  BACKEND,
  BACKEND_FOUND,
  CONNECTED,
  CURRENT_RES,
  FILE_NAME,
  HEATING,
  IS_PAUSED,
  PROG,
  PROGRESS,
  mapping,
} from "./constants/actions";

export const Context = createContext(null);
export const DispatchCtx = createContext(null);

export const initialState = {
  backendFound: false,
  backend: import.meta.env.VITE_BACKEND_URL,
  currentRes: null,
  connected: false,
  isPaused: true,
  progress: null,
  heating: null,
  prog: null,
  fileName: null,
  temp: null,
  createdTime: null,
  preview: null,
  estimatedEnd: null,
  remainingTime: null,
  percent: null,
  extPercent: null,
  bedPercent: null,
  partName: null,
};

export function reducer(state, action) {
  if (!action.diff) {
    for (const type in mapping) {
      if (type === action.type) {
        return { ...state, [action.type]: action.payload };
      } else {
        throw Error("Unknown action: " + action.type);
      }
    }
    // switch (action.type) {
    //   case BACKEND_FOUND: {
    //     return { ...state, backendFound: action.payload };
    //   }
    //   case CONNECTED: {
    //     return { ...state, connected: action.payload };
    //   }
    //   case CURRENT_RES: {
    //     return { ...state, currentRes: action.payload };
    //   }
    //   case BACKEND: {
    //     return { ...state, backend: action.payload };
    //   }
    //   case IS_PAUSED: {
    //     return { ...state, isPaused: action.payload };
    //   }
    //   case PROGRESS: {
    //     return { ...state, progress: action.payload };
    //   }
    //   case PROG: {
    //     return { ...state, prog: action.payload };
    //   }
    //   case HEATING: {
    //     return { ...state, heating: action.payload };
    //   }
    //   case FILE_NAME: {
    //     return { ...state, FILE_NAME: action.payload };
    //   }
    //   default: {
    //     throw Error("Unknown action: " + action.type);
    //   }
    // }
  } else {
    switch (action.type) {
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }
}
