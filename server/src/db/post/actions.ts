import { formatInputForUpdate } from "../../helper/updateHelper.js";
import { DbPost, Post } from "../../Types/postTypes.js";
import pool from "../index.js";

export async function sqlGetPosts() {
  try {
    const [result, meta] = await pool.query("SELECT * FROM post");
    return result as unknown as DbPost[];
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetPostById(id: string) {
  try {
    const [result, meta] = await pool.query("SELECT * FROM post WHERE id = ?", [
      id,
    ]);
    return (result as {}[])[0];
  } catch (error) {
    console.log(error);
  }
}
export async function sqlGetPostByUserId(id: string) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM post WHERE userId = ?",
      [id]
    );
    return result as Post[];
  } catch (error) {
    console.log(error);
  }
}

export async function sqlCreatePost(id: string, post: Post) {
  try {
    const propertyCount = Object.keys(post).length;
    const preparedPlaceholder = Array(propertyCount + 1)
      .fill("?")
      .join(", ");
    const columns = [...Object.keys(post), "userId"];
    const queryString = `INSERT INTO post (${columns}) VALUES (${preparedPlaceholder})`;
    const preparedValues = [...Object.values(post), id];
    const [result, meta] = await pool.query(queryString, preparedValues);
    const insertId = (result as { insertId: number }).insertId;
    const resPost = await sqlGetPostById(insertId.toString());
    return resPost;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlUpdatePost(id: string, post: Post) {
  try {
    const { keyValue, preparedArr } = formatInputForUpdate(post);
    const arrWithId = [...preparedArr, id];
    await pool.query(`UPDATE post SET ${keyValue} WHERE id = ?`, arrWithId);
    const resPost = await sqlGetPostById(id);
    return resPost;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlDeletePost(id: string) {
  try {
    const post = await sqlGetPostById(id);
    await pool.query("DELETE FROM post WHERE id = ?", [id]);
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetPostByLink(link: string) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM post WHERE link = ?",
      [link]
    );
    return (result as {}[])[0];
  } catch (error) {
    console.log(error);
  }
}
