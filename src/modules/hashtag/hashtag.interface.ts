export interface IHashtag {
  name: string;
  hashtagList: string[]; // List of hashtags associated with the user
  _id?: string; // Optional, for MongoDB ObjectId
  createdAt?: Date; // Optional, for creation timestamp
  updatedAt?: Date; // Optional, for last update timestamp
  workspaceId: string;
}
