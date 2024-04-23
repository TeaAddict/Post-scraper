import { MAX_AGE, UNFILTERED_DATA } from "../contants";
import express from "express";
import { sqlCreatePost, sqlGetPostByLink } from "../db/post/actions";
import { Post } from "../Types/postTypes";
import { sqlGetUserById, sqlGetUserBySessionToken } from "../db/user/actions";
import { sqlGetKeywords } from "../db/blacklist/actions";

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
    const { userId } = res.locals;
    let { keyword, location } = req.body;
    if (!keyword) return res.status(400).json({ error: "Requires a keyword" });
    if (!location) location = "Lithuania";

    const user = await sqlGetUserById(userId);
    if (!user) return res.status(400).json({ error: "User does not exist" });

    const blacklistedKeywords = await sqlGetKeywords(user.id);
    if (!blacklistedKeywords)
      return res
        .status(400)
        .json({ error: "Problem with getting blacklisted keywords" });
    const cleanBlackList = blacklistedKeywords.map((val) => val.keyword);

    return res.status(200).json(cleanBlackList);
    console.log("=============================");
    console.log("User:", user);
    console.log("Req body:", req.body);
    console.log("loc:", location);
    console.log("=============================");

    // const unfilteredPosts = await getLinkedinPosts("next js", "Lithuania");
    // if (!unfilteredPosts)
    //   return res.status(400).json({ error: "Problem with scraper" });

    const unfilteredPosts = UNFILTERED_DATA; // TODO: remove later

    const cleanPosts = filterByTitle(unfilteredPosts, cleanBlackList);

    cleanPosts.forEach(async (post) => {
      const res = await sqlGetPostByLink(post.link);
      if (res) return;

      sqlCreatePost(userId, post);
    });

    // return res.status(200).json(cleanPosts);
    return res.status(200).json(req.body);
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
