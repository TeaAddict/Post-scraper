import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { getIp } from "../helper/helpers";

const website_url = "https://www.scrapethissite.com/pages";

export async function getJobs() {
  console.log("====================================");
  const currentIp = await getIp();
  if (currentIp === process.env.MY_IP) return console.log("Hide ip!");

  const browser = await puppeteer
    .use(StealthPlugin())
    .launch({ headless: true });

  const page = await browser.newPage();
  await page.goto(website_url);

  //   const pageData = await page.evaluate((website_url) => {
  //     const posts = Array.from(document.querySelectorAll(".page"));
  //     const data = posts.map((post) => ({
  //       title: post.querySelector("h3 a")?.textContent,
  //     }));
  //     return data;
  //   }, website_url);
  //   console.log(pageData);
  const data2 = await page.evaluate((website_url) => {
    const posts = Array.from(document.querySelectorAll("div .page"));
    const data = posts.map((post) => ({
      content: post.querySelector("h3")?.textContent,
    }));
    return data;
  }, website_url);
  console.log(data2);

  await browser.close();
}
