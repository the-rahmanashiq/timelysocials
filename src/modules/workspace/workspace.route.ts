import express from "express";
import { WorkspaceController } from "./workspace.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// get => /api/v1/user
router.post("/create-workspace", auth(), WorkspaceController.CreateWorkspace);
router.get("/get-all-workspace", auth(), WorkspaceController.GetWorkspace);
router.get("/get-workspace/:id", auth(), WorkspaceController.GetWorkspaceById);
router.delete(
  "/delete-workspace/:id",
  auth(),
  WorkspaceController.DeleteWorkspace
);

export const workSpaceRoutes = router;
