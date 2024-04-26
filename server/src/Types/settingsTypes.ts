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
