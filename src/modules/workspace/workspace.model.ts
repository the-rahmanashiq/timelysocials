import { Schema, model } from "mongoose";
import { IWorkspace } from "./workspace.interface";

const TeamMemberSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, required: true, enum: ["admin", "editor", "viewer"] },
  status: { type: String, default: "active", enum: ["active", "inactive"] },
});

const socialMediaPlatform = new Schema({
  name: { type: String, required: true },
  connected: { type: Boolean, default: false },
});

const SettingsSchema = new Schema(
  {
    description: { type: String, default: "" },
    timeZone: { type: String, default: "UTC" },
  },
  { _id: false }
);

const workspaceSchema = new Schema<IWorkspace>({
  name: { type: String, required: true },
  teamMembers: { type: [TeamMemberSchema], required: true },
  socialMediaPlatforms: { type: [socialMediaPlatform], default: [] },
  settings: { type: SettingsSchema, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, default: "active", enum: ["active", "inactive"] },
});

// creating the model
const Workspace = model<IWorkspace>("Workspace", workspaceSchema);

export default Workspace;
