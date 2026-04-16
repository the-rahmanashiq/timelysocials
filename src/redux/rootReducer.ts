// src/redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistConfig } from "./persist";
import { baseApi } from "./api/baseApi";
import workspaceSlice from "./features/workspaceSplice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  workspace: workspaceSlice,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
