export interface IUser {
  name: string;
  email: string;
  password?: string;
  plan?: string; // Optional, defaults to "free"
  avatar?: string; // Optional, for user profile picture
  _id?: string; // Optional, for MongoDB ObjectId
  createdAt?: Date; // Optional, for creation timestamp
  updatedAt?: Date; // Optional, for last update timestamp
  lastLogin?: Date; // Optional, for tracking last login time
  // defaultWorkspace?: string | null; // Optional, reference to the default workspace
}
