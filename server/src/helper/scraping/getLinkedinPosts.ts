import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { getAgeInDays, getIp } from "../helpers";

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
    if (currentIp === process.env.MY_IP) return console.log("Hide ip!");

    const browser = await puppeteer
      .use(StealthPlugin())
      .launch({ headless: true });

    const page = await browser.newPage();
    await page.goto(cleanUrl);

    const jobPosts = await page.evaluate((cleanUrl) => {
      const posts = Array.from(
        document.querySelectorAll("div.job-search-card")
      );
      const res = posts.map((val) => {
        const innerDiv = val.querySelector("div.base-search-card__info");
        return {
          title: val
            .querySelector("div.base-search-card__info h3")
            ?.textContent?.trim(),
          link: val
            .querySelector("a.base-card__full-link")
            ?.getAttribute("href"),
          location: innerDiv
            ?.querySelector("div.base-search-card__metadata span")
            ?.textContent?.trim(),
          companyName: innerDiv?.querySelector("h4 a")?.textContent?.trim(),
          websiteCreatedAtDateTime: innerDiv
            ?.querySelector("div.base-search-card__metadata time")
            ?.getAttribute("datetime"),
          websiteCreatedAtString: innerDiv
            ?.querySelector("div.base-search-card__metadata time")
            ?.textContent?.trim(),
          ageInDays: 0,
          keywords: keywords,
          applied: false,
        };
      });

      return res;
    }, cleanUrl);
    if (!jobPosts.length) {
      console.log("Empty arr, send request again in 5 seconds");
    }
    await browser.close();

    const jobPostsWithAge = jobPosts.map((post) => {
      post.ageInDays = getAgeInDays(post.websiteCreatedAtDateTime ?? "");
      return post;
    });

    return jobPostsWithAge;
  } catch (error) {
    console.log(error);
  }
}
