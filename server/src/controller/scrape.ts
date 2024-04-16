import { BLACKLISTED_KEYWORDS, MAX_AGE, TEST_DATA } from "../contants";
import express from "express";
import { createJob } from "./job";
import { sqlCreateJob, sqlGetJobByLink } from "../db/job/actions";
import { Post } from "../Types/postTypes";

function filterByTitle(posts: Post[], filterWordList: string[]) {
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
    const { id } = req.cookies;

    // const unfilteredJobs = await getLinkedinPosts("next js", "Lithuania");
    // console.log(unfilteredJobs);
    const cleanPosts = filterByTitle(TEST_DATA, BLACKLISTED_KEYWORDS);

    cleanPosts.forEach(async (post) => {
      const res = await sqlGetJobByLink(post.link);
      if (res) return;

      sqlCreateJob(id, post);
    });

    // console.log(cleanPosts);
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
