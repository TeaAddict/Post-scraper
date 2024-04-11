import express from "express";
import {
  sqlCreateJob,
  sqlGetJob,
  sqlGetJobs,
  sqlUpdateJob,
} from "../db/job/actions.js";

export async function getJobs(req: express.Request, res: express.Response) {
  try {
    const jobs = await sqlGetJobs();
    if (!jobs) throw new Error("Problem with getting jobs");
    return res.status(200).json({ message: "Jobs :)" });
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
    const {
      title,
      link,
      age,
      job_website,
      website_created_at,
      promoted,
      easy_apply,
      applied,
      location,
    } = req.body;
    if (!title || !link || !age || !job_website || !website_created_at)
      return res.status(400).json({ error: "Missing required fields" });

    const job = await sqlCreateJob(
      id,
      title,
      link,
      age,
      job_website,
      website_created_at,
      promoted,
      easy_apply,
      applied,
      location
    );
    if (!job)
      return res.status(400).json({ error: "Problem with creating job" });

    return res.status(201).json(job);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with creating job" });
  }
}

export async function updateJob(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const {
      title,
      link,
      age,
      job_website,
      website_created_at,
      promoted,
      easy_apply,
      applied,
      location,
    } = req.body;
    // if (!title || !link || !age || !job_website || !website_created_at)
    //   return res.status(400).json({ error: "Missing required fields" });

    const job = await sqlUpdateJob(
      id,
      title,
      link,
      age,
      job_website,
      website_created_at,
      promoted,
      easy_apply,
      applied,
      location
    );
    if (!job)
      return res.status(400).json({ error: "Problem with updating job" });

    return res.status(201).json(job);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with updating job" });
  }
}

// title VARCHAR(255) NOT NULL,
// link VARCHAR(255) NOT NULL,
// age INT NOT NULL,
// job_website VARCHAR(255) NOT NULL,
// website_created_at VARCHAR(255) NOT NULL,
// promoted BOOLEAN NOT NULL DEFAULT 0,
// easy_apply BOOLEAN NOT NULL DEFAULT 0,
// applied BOOLEAN NOT NULL DEFAULT 0,
// location VARCHAR(255),
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
// user_id INT,
