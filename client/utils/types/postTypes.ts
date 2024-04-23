// Commented properties are gotten property types from server (before converting it in client for table sorting)

export type Post = {
  title: string;
  link: string;
  location: string;
  companyName: string;
  ageInDays: number;
  // ageInDays: string;
  keywords: string;
  applied: number;
  blacklisted: number;
  // websiteCreatedAtDateTime: string;
  websiteCreatedAtDateTime: Date;
  websiteCreatedAtString: string;
  id: number;
};

export type FullPost = Post & {
  createdAt: string;
  updatedAt: string;
  userId: number;
};
