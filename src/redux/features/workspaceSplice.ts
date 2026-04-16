// features/workspace/workspaceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWorkspaceId: null, // This will be persisted
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setCurrentWorkspace: (state, action) => {
      state.currentWorkspaceId = action.payload;
    },
    clearCurrentWorkspace: (state) => {
      state.currentWorkspaceId = null;
    },
  },
});

export const { setCurrentWorkspace, clearCurrentWorkspace } =
  workspaceSlice.actions;
export default workspaceSlice.reducer;
