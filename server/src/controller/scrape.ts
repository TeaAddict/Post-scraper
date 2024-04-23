import { BLACKLISTED_KEYWORDS, MAX_AGE, UNFILTERED_DATA } from "../contants";
import express from "express";
import { sqlCreatePost, sqlGetPostByLink } from "../db/post/actions";
import { Post } from "../Types/postTypes";
import { sqlGetUserBySessionToken } from "../db/user/actions";

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
    let { keyword, location } = req.body;
    if (!keyword) return res.status(400).json({ error: "Requires a keyword" });
    if (!location) location = "Lithuania";

    const sessionToken = req.cookies["USER-AUTH"];
    if (!sessionToken)
      return res.status(400).json({ error: "User is unauthorized" });

    const user = await sqlGetUserBySessionToken(sessionToken);
    if (!user) return res.status(400).json({ error: "User does not exist" });

    console.log("=============================");
    console.log("User:", user);
    console.log("Req body:", req.body);
    console.log("loc:", location);
    console.log("=============================");

    // const unfilteredPosts = await getLinkedinPosts("next js", "Lithuania");
    // if (!unfilteredPosts)
    //   return res.status(400).json({ error: "Problem with scraper" });

    const unfilteredPosts = UNFILTERED_DATA; // TODO: remove later

    const cleanPosts = filterByTitle(unfilteredPosts, BLACKLISTED_KEYWORDS);

    cleanPosts.forEach(async (post) => {
      const res = await sqlGetPostByLink(post.link);
      if (res) return;

      sqlCreatePost(user.id.toString(), post);
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
