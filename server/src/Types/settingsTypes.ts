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

export type PostAge = {
  id: number;
  age: string;
  created_at: Date;
  updated_at: Date;
  settings_id: number;
};
export type JobType = {
  id: number;
  full_time: boolean;
  part_time: boolean;
  created_at: Date;
  updated_at: Date;
  settings_id: number;
};
export type ExperienceLevel = {
  id: number;
  internship: boolean;
  entry_level: boolean;
  mid_senior_level: boolean;
  director: boolean;
  executive: boolean;
  created_at: Date;
  updated_at: Date;
  settings_id: number;
};
export type Remote = {
  id: number;
  on_site: boolean;
  hybrid: boolean;
  remote: boolean;
  created_at: Date;
  updated_at: Date;
  settings_id: number;
};
