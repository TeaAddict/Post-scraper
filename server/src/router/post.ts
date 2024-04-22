import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controller/post.js";
import { validateCookie } from "../middleware/validateCookie.js";

export default (router: express.Router) => {
  router.get("/post", validateCookie, getPosts);
  router.get("/post/:id", validateCookie, getPost);
  router.post("/post/:id", validateCookie, createPost);
  router.put("/post/:id", validateCookie, updatePost);
  router.delete("/post/:id", validateCookie, deletePost);
};
