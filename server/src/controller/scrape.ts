import { BLACKLISTED_KEYWORDS, MAX_AGE, TEST_DATA } from "../contants";
import express from "express";

export type Post = {
  title: string;
  link: string;
  location: string;
  companyName: string;
  websiteCreatedAtDateTime: string;
  websiteCreatedAtString: string;
  ageInDays: number;
  keywords: string;
};

function filter(posts: Post[], filterWordList: string[]) {
  return posts.filter(
    (post) =>
      !(
        filterWordList.some((word) =>
          post.title.toLowerCase().includes(word)
        ) || post.ageInDays > MAX_AGE
      )
  );
}

export async function getPosts(req: express.Request, res: express.Response) {
  try {
    // const unfilteredJobs = await getLinkedinPosts("next js", "Lithuania");
    // console.log(unfilteredJobs);
    const cleanPosts = filter(TEST_DATA, BLACKLISTED_KEYWORDS);
    console.log(cleanPosts);
    return res.status(200).json(cleanPosts);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with getting posts" });
  }
}

export async function savePosts(req: express.Request, res: express.Response) {
  try {
    return res.status(200).json({ msg: "All good" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with saving posts" });
  }
}
