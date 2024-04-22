import express from "express";
import {
  sqlCreatePost,
  sqlDeletePost,
  sqlGetPost,
  sqlGetPostByLink,
  sqlGetPosts,
  sqlUpdatePost,
} from "../db/post/actions.js";

export async function getPosts(req: express.Request, res: express.Response) {
  try {
    const posts = await sqlGetPosts();
    if (!posts) throw new Error("Problem with getting posts");

    const formatted = posts.map((post) => ({
      title: post.title,
      link: post.link,
      location: post.location,
      companyName: post.companyName,
      websiteCreatedAtDateTime: post.websiteCreatedAtDateTime,
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

export async function getPost(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;

    const post = await sqlGetPost(id);
    if (!post)
      return res.status(400).json({ error: "Problem with getting post" });

    return res.status(200).json(post);
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

    const resultpost = await sqlCreatePost(id, req.body);
    if (!resultpost)
      return res.status(400).json({ error: "Problem with creating post" });

    return res.status(201).json(resultpost);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with creating post" });
  }
}

export async function updatePost(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;

    const post = await sqlUpdatePost(id, req.body);
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
    const post = await sqlDeletePost(id);
    if (!post)
      return res.status(400).json({ error: "Problem with deleting post" });

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with deleting post" });
  }
}
