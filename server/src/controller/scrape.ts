import express from "express";
import { sqlCreatePost, sqlGetPostByLink } from "../db/post/actions";
import { sqlGetUserById } from "../db/user/actions";
import { sqlGetKeywords } from "../db/blacklist/actions";
import { filterPosts } from "../utils/filterByTitle";
import { objKeysCamelToSnake } from "../helper/helpers";
import { Post } from "../Types/postTypes";
import {
  sqlGetAllLinkedinSettings,
  sqlGetSettingsByUserId,
} from "../db/settings/settingsActions";
import { getWebsitePosts } from "../helper/scraping/getLinkedinPosts";
import { formatLinkedinSettings } from "../helper/scraping/formatLinkedinSettings";

export async function getPosts(req: express.Request, res: express.Response) {
  try {
    const MAX_AGE_IN_DAYS = 30;

    const { userId } = res.locals;
    let { keyword, location } = req.body;
    if (!keyword) return res.status(400).json({ error: "Requires a keyword" });
    if (!location) location = "Lithuania";

    const user = await sqlGetUserById(userId);
    if (!user) return res.status(400).json({ error: "User does not exist" });

    const generalSettings = await sqlGetSettingsByUserId(userId);
    if (!generalSettings)
      return res
        .status(400)
        .json({ error: "Problem getting general settings" });
    const { get_post_count: getPostCount } = generalSettings;

    const blacklistedKeywords = await sqlGetKeywords(user.id);
    if (!blacklistedKeywords)
      return res
        .status(400)
        .json({ error: "Problem with getting blacklisted keywords" });
    const cleanBlackList = blacklistedKeywords.map((val) => val.keyword);

    const linkedinSettings = await sqlGetAllLinkedinSettings(userId);
    if (!linkedinSettings)
      throw new Error("Problem with getting linkedin settings");

    const linkedinSettingsClean = formatLinkedinSettings(linkedinSettings);

    const scrapeRes = await getWebsitePosts(
      keyword,
      location,
      linkedinSettingsClean,
      getPostCount
    );

    if (scrapeRes === "no results")
      return res.status(200).json({ message: "no results" });

    if (!scrapeRes)
      return res.status(400).json({ error: "Problem with scraper" });

    const snakeCased = scrapeRes.posts.map((val) =>
      objKeysCamelToSnake(val)
    ) as unknown as Post[];

    const cleanPosts = filterPosts(snakeCased, cleanBlackList, MAX_AGE_IN_DAYS);

    cleanPosts.forEach(async (post) => {
      const res = await sqlGetPostByLink(post.link);
      if (!res) sqlCreatePost(userId, post);
    });

    return res.status(200).json({ maxPosts: scrapeRes.maxPosts, cleanPosts });
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
