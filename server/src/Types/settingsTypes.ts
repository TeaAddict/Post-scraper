export type Settings = {
  appliedFilter: boolean;
  blacklistedFilter: boolean;
};

export type FullSettings = Settings & {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
};

export type SettingsChildDbInfo = {
  id: number;
  created_at: Date;
  updated_at: Date;
  settings_id: number;
};

export type PostAge = {
  age: string;
};
export type FullPostAge = PostAge & SettingsChildDbInfo;

export type JobType = {
  full_time: boolean;
  part_time: boolean;
};
export type FullJobType = JobType & SettingsChildDbInfo;

export type ExperienceLevel = {
  internship: boolean;
  entry_level: boolean;
  mid_senior_level: boolean;
  director: boolean;
  executive: boolean;
};
export type FullExperienceLevel = ExperienceLevel & SettingsChildDbInfo;

export type Remote = {
  on_site: boolean;
  hybrid: boolean;
  remote: boolean;
};
export type FullRemote = Remote & SettingsChildDbInfo;
