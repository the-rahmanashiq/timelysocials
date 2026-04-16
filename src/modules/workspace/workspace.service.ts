import { IUser } from "../user/user.interface";
import { IWorkspace } from "./workspace.interface";
import Workspace from "./workspace.model";

const createWorkspace = async (
  _id: string,
  workspaceName: string
): Promise<IWorkspace | null> => {
  const result = await Workspace.create({
    name: workspaceName,
    teamMembers: [
      {
        _id: _id,
        role: "admin",
      },
    ],
  });

  return result;
};

const getWorkspace = async (user: IUser): Promise<IWorkspace[] | null> => {
  const workSpaceData = await Workspace.find({
    teamMembers: {
      $elemMatch: {
        _id: user._id,
      },
    },
  });

  return workSpaceData;
};

const deleteWorkspace = async (
  workspaceId: string
): Promise<IWorkspace | null> => {
  const result = await Workspace.findByIdAndDelete(workspaceId);
  return result;
};

export const getWorkspaceById = async (
  workspaceId: string
): Promise<IWorkspace | null> => {
  const result = await Workspace.findById(workspaceId).populate({
    path: "teamMembers._id",
    select: "name email lastLogin status",
  });

  if (!result) {
    return null;
  }

  // Flatten teamMembers and assert the populated user object
  const teamMembers = result.teamMembers.map((member) => {
    const user =
      typeof member._id === "object" && member._id !== null
        ? (member._id as {
            _id: string;
            name: string;
            email: string;
            lastLogin: Date;
          })
        : { _id: member._id as string, name: "", email: "", lastLogin: null };

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: member.role,
      status: member.status,
      lastLogin: user.lastLogin,
    };
  });

  return {
    _id: result._id.toString(),
    name: result.name,
    teamMembers,
    socialMediaPlatforms: result.socialMediaPlatforms,
    settings: result.settings,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    status: result.status,
  };
};

export const WorkspaceService = {
  createWorkspace,
  getWorkspace,
  deleteWorkspace,
  getWorkspaceById,
};
