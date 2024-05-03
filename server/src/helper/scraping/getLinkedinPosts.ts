import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { getAgeInDays, getIp, sleep } from "../helpers";

function addUrlParams(webUrl: string, keywords: string, location: string) {
  const url = new URL(webUrl);
  url.searchParams.set("keywords", keywords);
  url.searchParams.set("location", location);
  return url.toString();
}

// If returns: error or []   it probably means that linkedin is BLOCKING, code is fine. Just send request again.
export async function getLinkedinPosts(
  keywords: string,
  location: string,
  pages: number = 1
) {
  try {
    const websiteUrl =
      "https://www.linkedin.com/jobs/search?keywords=javascript&location=Lithuania&geoId=&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0";

    const cleanUrl = addUrlParams(websiteUrl, keywords, location);

    const currentIp = await getIp();
    if (currentIp === process.env.MY_IP) {
      console.log("Hide ip!");
      return "hide ip";
    }

    const browser = await puppeteer
      .use(StealthPlugin())
      .launch({ headless: false });

    const page = await browser.newPage();
    await page.goto(cleanUrl);

    const jobPosts = await page.evaluate(
      (cleanUrl, keywords) => {
        const posts = Array.from(
          document.querySelectorAll("div.job-search-card")
        );
        const res = posts.map((val) => {
          const innerDiv = val.querySelector("div.base-search-card__info");
          return {
            title:
              val
                .querySelector("div.base-search-card__info h3")
                ?.textContent?.trim() ?? "",
            link:
              val
                .querySelector("a.base-card__full-link")
                ?.getAttribute("href") ?? "",
            location:
              innerDiv
                ?.querySelector("div.base-search-card__metadata span")
                ?.textContent?.trim() ?? "",
            companyName:
              innerDiv?.querySelector("h4 a")?.textContent?.trim() ?? "",
            websiteCreatedAtDatetime:
              innerDiv
                ?.querySelector("div.base-search-card__metadata time")
                ?.getAttribute("datetime") ?? "",
            websiteCreatedAtString:
              innerDiv
                ?.querySelector("div.base-search-card__metadata time")
                ?.textContent?.trim() ?? "",
            ageInDays: 0,
            keywords,
            applied: false,
            blacklisted: false,
          };
        });

        return res;
      },
      cleanUrl,
      keywords
    );
    if (!jobPosts.length) return;

    await browser.close();

    const jobPostsWithAge = jobPosts.map((post) => {
      post.ageInDays = getAgeInDays(post.websiteCreatedAtDatetime ?? "");
      return post;
    });

    return jobPostsWithAge;
  } catch (error) {
    console.log(error);
  }
}

export async function getWebsitePosts(
  keywords: string,
  location: string,
  pages: number = 1,
  retries: number = 5,
  sleepDuration: number = 10
) {
  try {
    for (let i = 1; i !== retries + 1; i++) {
      console.log("Loop num:", i);
      const posts = await getLinkedinPosts(keywords, location, pages);

      if (posts === "hide ip") {
        return;
      } else if (posts === undefined || !posts.length) {
        console.log("Empty arr, send request again in 5 seconds");
        await sleep(sleepDuration * 1000);
      } else {
        return posts;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// Errors I am getting when fetching data:
// 1. "Error: Execution context was destroyed, most likely because of a navigation."       (throws error, should probably compare message and retry)
// 2. []                                       (empty array, probably because got redirected to login page)
