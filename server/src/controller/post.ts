import express from "express";
import {
  sqlCreatePost,
  sqlDeletePost,
  sqlGetPostByLink,
  sqlGetPostByUserId,
  sqlGetPosts,
  sqlUpdatePost,
} from "../db/post/actions.js";
import { sqlGetUserBySessionToken } from "../db/user/actions.js";
import { sqlGetSettingsByUserId } from "../db/settings/settingsActions.js";

export async function getPosts(req: express.Request, res: express.Response) {
  try {
    const posts = await sqlGetPosts();
    if (!posts) throw new Error("Problem with getting posts");

    const formatted = posts.map((post) => ({
      title: post.title,
      link: post.link,
      location: post.location,
      companyName: post.companyName,
      websiteCreatedAtDatetime: post.websiteCreatedAtDatetime,
      websiteCreatedAtString: post.websiteCreatedAtString,
      ageInDays: post.ageInDays,
      keywords: post.keywords,
      applied: post.applied,
      blacklisted: post.blacklisted,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with getting posts" });
  }
}

// export async function getPost(req: express.Request, res: express.Response) {
//   try {
//     const { id } = req.params;

//     const post = await sqlGetPost(id);
//     if (!post)
//       return res.status(400).json({ error: "Problem with getting post" });

//     return res.status(200).json(post);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error: "Problem with getting post" });
//   }
// }

export async function getPostByUserId(
  req: express.Request,
  res: express.Response
) {
  try {
    const sessionToken = req.cookies["USER-AUTH"];
    if (!sessionToken)
      return res.status(400).json({ error: "User is unauthorized" });

    const user = await sqlGetUserBySessionToken(sessionToken);
    if (!user) return res.status(400).json({ error: "User does not exist" });

    const posts = await sqlGetPostByUserId(user.id);
    if (!posts)
      return res.status(400).json({ error: "Problem with getting post" });

    const settings = await sqlGetSettingsByUserId(user.id);
    if (!settings)
      return res.status(400).json({ error: "Problem with getting settings" });

    const filteredPosts = posts.filter((post) => {
      if (
        (settings.appliedFilter && post.applied) ||
        (settings.blacklistedFilter && post.blacklisted)
      ) {
        return;
      } else {
        return post;
      }
    });

    return res.status(200).json(filteredPosts);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with getting post" });
  }
}

export async function createPost(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const { title, link, ageInDays, companyName, keywords } = req.body;
    if (!title || !link || !ageInDays || !companyName || !keywords)
      return res.status(400).json({ error: "Missing required fields" });

    const post = await sqlGetPostByLink(link);
    if (post) return res.status(400).json({ error: "post already exists" });

    const resultpost = await sqlCreatePost(Number(id), req.body);
    if (!resultpost)
      return res.status(400).json({ error: "Problem with creating post" });

    return res.status(201).json(resultpost);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with creating post" });
  }
}

export async function updatePostById(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.params;

    const post = await sqlUpdatePost(Number(id), req.body);
    if (!post)
      return res.status(400).json({ error: "Problem with updating post" });

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with updating post" });
  }
}

export async function deletePost(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;

    const post = await sqlDeletePost(Number(id));
    if (!post)
      return res.status(400).json({ error: "Problem with deleting post" });

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with deleting post" });
  }
}
