import express from "express";
import {
  createPost,
  deletePost,
  getPostByUserId,
  // getPost,
  updatePostById,
} from "../controller/post.js";
import { validateCookie } from "../middleware/validateCookie.js";

export default (router: express.Router) => {
  // router.get("/post", validateCookie, getPosts);
  // router.get("/post/:id", validateCookie, getPost);
  router.get("/post", validateCookie, getPostByUserId);
  router.post("/post/:id", validateCookie, createPost);
  router.put("/post/:id", validateCookie, updatePostById);
  router.delete("/post/:id", validateCookie, deletePost);
};
