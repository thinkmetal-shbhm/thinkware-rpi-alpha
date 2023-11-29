import { createContext } from "react";
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
  PART_NAME,
  PERCENT,
  PREVIEW,
  PROG,
  PROGRESS,
  REMAINING_TIME,
  TEMP,
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
  console.log(action);
  console.log(mapping);
  // debugger;
  // if (action.diff === undefined) {
  //   debugger;
  //   for (const type in mapping) {
  //     if (type == action.type) {
  //       return { ...state, [action.type]: action.payload };
  //     } else {
  //       console.warn(action);
  //       throw Error("Unknown action: " + action.type);
  //     }
  //   }
  switch (action.type) {
    case BACKEND_FOUND: {
      return { ...state, backendFound: action.payload };
    }
    case CONNECTED: {
      return { ...state, connected: action.payload };
    }
    case CURRENT_RES: {
      return { ...state, currentRes: action.payload };
    }
    case BACKEND: {
      return { ...state, backend: action.payload };
    }
    case IS_PAUSED: {
      return { ...state, isPaused: action.payload };
    }
    case PROGRESS: {
      return { ...state, progress: action.payload };
    }
    case PROG: {
      return { ...state, prog: action.payload };
    }
    case HEATING: {
      return { ...state, heating: action.payload };
    }
    case FILE_NAME: {
      return { ...state, fileName: action.payload };
    }
    case TEMP: {
      return { ...state, temp: action.payload };
    }
    case CREATED_TIME: {
      return { ...state, createdTime: action.payload };
    }
    case PREVIEW: {
      return { ...state, preview: action.payload };
    }
    case ESTIMATED_END: {
      return { ...state, estimatedEnd: action.payload };
    }
    case REMAINING_TIME: {
      return { ...state, remainingTime: action.payload };
    }
    case PERCENT: {
      return { ...state, percent: action.payload };
    }
    case EXT_PERCENT: {
      return { ...state, extPercent: action.payload };
    }
    case BED_PERCENT: {
      return { ...state, bedPercent: action.payload };
    }
    case PART_NAME: {
      return { ...state, partName: action.payload };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
  // } else {
  //   debugger;
  //   switch (action.type) {
  //     default: {
  //       throw Error("Unknown action: " + action.type);
  //     }
  //   }
  // }
}
