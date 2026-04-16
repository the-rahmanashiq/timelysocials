import { Request, Response } from "express";
import httpStatus from "http-status";
import { IUser } from "../user/user.interface";
import { WorkspaceService } from "./workspace.service";
import User from "../user/user.model";

const CreateWorkspace = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  const workspaceName = req.body.name;

  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Unauthorized",
      success: false,
      status: httpStatus.UNAUTHORIZED,
    });
  }
  const result = await WorkspaceService.createWorkspace(
    user._id as string,
    workspaceName
  );
  if (!result) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create workspace",
      success: false,
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  res.status(httpStatus.CREATED).json({
    message: "Workspace created successfully",
    success: true,
    status: httpStatus.CREATED,
    data: result,
  });
};

const GetWorkspace = async (req: Request, res: Response) => {
  const user = req.user as IUser;

  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Unauthorized",
      success: false,
      status: httpStatus.UNAUTHORIZED,
    });
  }

  const result = await WorkspaceService.getWorkspace(user);

  res.status(httpStatus.CREATED).json({
    message: "Workspace created successfully",
    success: true,
    status: httpStatus.CREATED,
    data: result,
  });
};

const DeleteWorkspace = async (req: Request, res: Response) => {
  try {
    const workspaceId = req.params.id;

    // Delete the workspace
    const result = await WorkspaceService.deleteWorkspace(workspaceId);

    // Find users who have this workspace as their default
    const userData = await User.find({ defaultWorkspace: workspaceId });

    if (userData.length > 0) {
      await User.updateMany(
        { defaultWorkspace: workspaceId },
        { $unset: { defaultWorkspace: "" } } // Correct use of $unset
      );
    }

    res.status(httpStatus.OK).json({
      message: "Workspace deleted successfully",
      success: true,
      status: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to delete workspace",
      success: false,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: error instanceof Error ? error.message : error,
    });
  }
};

const GetWorkspaceById = async (req: Request, res: Response) => {
  const workspaceId = req.params.id;
  const result = await WorkspaceService.getWorkspaceById(workspaceId);

  res.status(httpStatus.OK).json({
    message: "Workspace fetched successfully",
    success: true,
    status: httpStatus.OK,
    data: result,
  });
};

export const WorkspaceController = {
  CreateWorkspace,
  GetWorkspace,
  DeleteWorkspace,
  GetWorkspaceById,
};
