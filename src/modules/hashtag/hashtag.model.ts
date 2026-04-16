import { Schema, model } from "mongoose";
import { IHashtag } from "./hashtag.interface";

const hashtagSchema = new Schema<IHashtag>(
  {
    name: { type: String, required: true },
    hashtagList: { type: [String], default: [] }, // List of hashtags associated with the user
    workspaceId: { type: String, required: true }, // Workspace ID to associate the hashtag with
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// creating the model
const Hashtag = model<IHashtag>("Hashtag", hashtagSchema);

export default Hashtag;
