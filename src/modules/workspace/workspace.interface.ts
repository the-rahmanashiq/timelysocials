interface ITeamMember {
  _id: string; // ObjectId as string
  role: "admin" | "editor" | "viewer";
  status?: "active" | "inactive";
}

interface ISocialMediaPlatform {
  name: string;
  connected: boolean;
}

interface ISettings {
  name: string;
  description: string;
  timeZone: string;
}

export interface IWorkspace {
  _id: string; // ObjectId as string
  name: string;
  teamMembers: ITeamMember[];
  socialMediaPlatforms: ISocialMediaPlatform[];
  settings: ISettings;
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "inactive";
}
