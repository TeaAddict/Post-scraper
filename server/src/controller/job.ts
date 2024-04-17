import express from "express";
import {
  sqlCreateJob,
  sqlDeleteJob,
  sqlGetJob,
  sqlGetJobByLink,
  sqlGetJobs,
  sqlUpdateJob,
} from "../db/job/actions.js";

export async function getJobs(req: express.Request, res: express.Response) {
  try {
    const jobs = await sqlGetJobs();
    if (!jobs) throw new Error("Problem with getting jobs");

    const formatted = jobs.map((post) => ({
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
    return res.status(400).json({ error: "Problem with getting jobs" });
  }
}

export async function getJob(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;

    const job = await sqlGetJob(id);
    if (!job)
      return res.status(400).json({ error: "Problem with getting job" });

    return res.status(200).json(job);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with getting job" });
  }
}

export async function createJob(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const { title, link, ageInDays, companyName, keywords } = req.body;
    if (!title || !link || !ageInDays || !companyName || !keywords)
      return res.status(400).json({ error: "Missing required fields" });

    const job = await sqlGetJobByLink(link);
    if (job) return res.status(400).json({ error: "Job already exists" });

    const resultJob = await sqlCreateJob(id, req.body);
    if (!resultJob)
      return res.status(400).json({ error: "Problem with creating job" });

    return res.status(201).json(resultJob);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with creating job" });
  }
}

export async function updateJob(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;

    const job = await sqlUpdateJob(id, req.body);
    if (!job)
      return res.status(400).json({ error: "Problem with updating job" });

    return res.status(201).json(job);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with updating job" });
  }
}

export async function deleteJob(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const job = await sqlDeleteJob(id);
    if (!job)
      return res.status(400).json({ error: "Problem with deleting job" });

    return res.status(201).json(job);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with deleting job" });
  }
}
