import express from "express";
import {
  sqlAddToBlacklist,
  sqlGetKeyword,
  sqlGetKeywords,
  sqlRemoveFromBlacklist,
} from "../db/blacklist/actions";
import { sqlGetUserById } from "../db/user/actions";

export async function getKeywords(req: express.Request, res: express.Response) {
  try {
    const { userId } = res.locals;

    const user = await sqlGetUserById(userId);
    if (!user) return res.status(400).json({ error: "User is unauthorized" });

    const keywords = await sqlGetKeywords(user.id);
    if (!keywords || !keywords.length)
      return res.status(400).json({ error: "Problem with getting keywords" });

    return res.status(200).json(keywords);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with getting keyword" });
  }
}

// export async function getKeyword(req: express.Request, res: express.Response) {
//   try {
//     const { keyword } = req.body;
//     if (!keyword)
//       return res
//         .status(400)
//         .json({ error: "Required field 'keyword' is missing" });

//     const resKeyword = await sqlGetKeyword(keyword);
//     if (!resKeyword)
//       return res.status(400).json({ error: "Keyword does not exist" });

//     return res.status(201).json(resKeyword);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error: "Problem with getting keyword" });
//   }
// }

export async function addToBlacklist(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userId } = res.locals;

    const user = await sqlGetUserById(userId);
    if (!user) return res.status(400).json({ error: "User is unauthorized" });

    const { keyword } = req.body;
    if (!keyword)
      return res
        .status(400)
        .json({ error: "Required field 'keyword' is missing" });

    const keywordExists = await sqlGetKeyword(keyword);
    if (keywordExists)
      return res.status(400).json({ error: "Keyword already exists" });

    const resKeyword = await sqlAddToBlacklist(keyword, user.id);
    if (!resKeyword)
      return res.status(400).json({ error: "Problem with creating keyword" });

    return res.status(201).json(resKeyword);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with creating keyword" });
  }
}

export async function removeFromBlacklist(
  req: express.Request,
  res: express.Response
) {
  try {
    const { keyword } = req.body;
    if (!keyword)
      return res
        .status(400)
        .json({ error: "Required field 'keyword' is missing" });

    const keywordExists = await sqlGetKeyword(keyword);
    if (!keywordExists)
      return res.status(400).json({ error: "Keyword does not exist" });

    const resKeyword = await sqlRemoveFromBlacklist(keyword);
    if (!resKeyword)
      return res.status(400).json({ error: "Problem with creating keyword" });

    return res.status(201).json(resKeyword);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with creating keyword" });
  }
}
