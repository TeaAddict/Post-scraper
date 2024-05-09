export type Settings = {
  appliedFilter: number;
  blacklistedFilter: number;
  getPostCount: number;
};

export type FullSettings = Settings & {
  createdAt: Date;
  id: number;
  updatedAt: Date;
  userId: number;
};

export type PostAge = {
  id: number;
  age: string;
  createdAt: Date;
  updatedAt: Date;
  settingsId: number;
};
// export type PostAge = {
//   id: number;
//   age: string;
//   created_at: Date;
//   updated_at: Date;
//   settings_id: number;
// };
export type JobType = {
  id: number;
  fullTime: boolean;
  partTime: boolean;
  createdAt: Date;
  updatedAt: Date;
  settingsId: number;
};
// export type JobType = {
//   id: number;
//   full_time: boolean;
//   part_time: boolean;
//   created_at: Date;
//   updated_at: Date;
//   settings_id: number;
// };
export type ExperienceLevel = {
  id: number;
  internship: boolean;
  entryLevel: boolean;
  midSeniorLevel: boolean;
  director: boolean;
  executive: boolean;
  createdAt: Date;
  updatedAt: Date;
  settingsId: number;
};
// export type ExperienceLevel = {
//   id: number;
//   internship: boolean;
//   entry_level: boolean;
//   mid_senior_level: boolean;
//   director: boolean;
//   executive: boolean;
//   created_at: Date;
//   updated_at: Date;
//   settings_id: number;
// };
export type Remote = {
  id: number;
  onSite: boolean;
  hybrid: boolean;
  remote: boolean;
  createdAt: Date;
  updatedAt: Date;
  settingsId: number;
};
