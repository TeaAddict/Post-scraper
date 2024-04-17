export type Post = {
  title: string;
  link: string;
  location: string;
  companyName: string;
  websiteCreatedAtDateTime: string;
  websiteCreatedAtString: string;
  ageInDays: number;
  keywords: string;
  applied: boolean;
  blacklisted: boolean;
};

export type DbPost = {
  id: number;
  title: string;
  link: string;
  ageInDays: string;
  companyName: string;
  location: string;
  applied: number;
  websiteCreatedAtDateTime: string;
  websiteCreatedAtString: string;
  keywords: string;
  blacklisted: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};
