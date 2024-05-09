import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { addUrlParams, getAgeInDays, getIp, sleep } from "../helpers";
import {
  ExperienceLevel,
  JobType,
  PostAge,
  Remote,
} from "../../Types/settingsTypes";
import { formatLinkedinUrlSettings } from "./formatLinkedinUrlSettings";
import { Page } from "puppeteer";
import {
  clickSeeMore,
  getLinkedinPostsFromPage,
  getMaxPostCount,
  postsExist,
} from "./getLinkedinPostsFromPage";

type ScrapePost = {
  title: string;
  link: string;
  location: string;
  companyName: string;
  websiteCreatedAtDatetime: string;
  websiteCreatedAtString: string;
  ageInDays: number;
  keywords: string;
  applied: boolean;
  blacklisted: boolean;
};

async function scrollDownPageHeight(page: Page) {
  const previousHeight = (await page.evaluate(
    "document.body.scrollHeight"
  )) as number;
  await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
  await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
  return previousHeight;
}
async function scrollUpPageHeight(page: Page) {
  const previousHeight = (await page.evaluate(
    "document.body.scrollHeight"
  )) as number;
  await page.evaluate("window.scrollTo(0, 0)");
  await page.waitForFunction(`document.body.scrollHeight === 0`);
  return previousHeight;
}

// If returns: error or []   it probably means that linkedin is BLOCKING, code is fine. Just send request again.
export async function getLinkedinPosts(
  keywords: string,
  location: string,
  postNumber: number,
  settings: {
    age: PostAge;
    jobType: JobType;
    experienceLevel: ExperienceLevel;
    remote: Remote;
  }
) {
  const browser = await puppeteer
    .use(StealthPlugin())
    .launch({ headless: true });

  try {
    const websiteUrl =
      "https://www.linkedin.com/jobs/search?keywords=javascript&location=Lithuania&geoId=&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0";

    const updatedUrl = formatLinkedinUrlSettings(websiteUrl, settings);

    const urlWKeywords = addUrlParams(updatedUrl, {
      key: "keywords",
      value: keywords,
    });
    const cleanUrl = addUrlParams(urlWKeywords, {
      key: "location",
      value: location,
    });

    const currentIp = await getIp();
    if (currentIp === process.env.MY_IP) {
      console.log("Hide ip!");
      return "hide ip";
    }

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);
    await page.setViewport({
      width: 1200,
      height: 800,
    });

    await page.goto(cleanUrl);

    const exist = await postsExist(page);
    if (!exist) return "no results";

    const maxPosts = await getMaxPostCount(page);

    let jobPosts: ScrapePost[] | "no results" = [];
    while (jobPosts.length < postNumber && jobPosts.length < maxPosts) {
      const newPosts = await getLinkedinPostsFromPage(page, cleanUrl, keywords);

      if (newPosts.length === maxPosts) {
        jobPosts = newPosts;
        break;
      }

      console.log("Desired post num:", postNumber);
      console.log("Max Post length:", maxPosts);
      console.log("New post length:", newPosts.length);
      console.log("Post length:", jobPosts.length);

      if (newPosts.length === jobPosts.length) scrollUpPageHeight(page);

      jobPosts = newPosts;

      await clickSeeMore(page);
      await sleep(2000);
      scrollDownPageHeight(page);
      await sleep(2000);
    }

    if (!jobPosts.length) return;

    const jobPostsWithAge = jobPosts.map((post) => {
      post.ageInDays = getAgeInDays(post.websiteCreatedAtDatetime ?? "");
      return post;
    });

    return { posts: jobPostsWithAge, maxPosts };
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}

export async function getWebsitePosts(
  keywords: string,
  location: string,
  linkedinSettings: {
    age: PostAge;
    jobType: JobType;
    experienceLevel: ExperienceLevel;
    remote: Remote;
  },
  postNumber: number,
  retries: number = 5,
  sleepDuration: number = 10
) {
  try {
    for (let i = 1; i !== retries + 1; i++) {
      console.log("Loop num:", i);
      const posts = await getLinkedinPosts(
        keywords,
        location,
        postNumber,
        linkedinSettings
      );

      if (posts === "hide ip") {
        return;
      } else if (posts === "no results") {
        console.log("Could not find posts");
        return "no results";
      } else if (posts === undefined || !posts.posts.length) {
        console.log("Empty arr, send request again in 5 seconds");
        await sleep(sleepDuration * 1000);
      } else {
        return { posts: posts.posts, maxPosts: posts.maxPosts };
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// Errors I am getting when fetching data:
// 1. "Error: Execution context was destroyed, most likely because of a navigation."       (throws error, should probably compare message and retry)
// 2. []                                       (empty array, probably because got redirected to login page)
