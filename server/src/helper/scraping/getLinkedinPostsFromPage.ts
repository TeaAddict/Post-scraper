import { Page } from "puppeteer";

export async function getMaxPostCount(page: Page) {
  const maxPosts = await page.evaluate(() => {
    return document.querySelector("span.results-context-header__job-count")
      ?.textContent;
  });
  return Number(maxPosts);
}

export async function postsExist(page: Page) {
  return await page.evaluate(() => {
    const couldNotFind = document
      .querySelector("h1.core-section-container__main-title.main-title")
      ?.textContent?.trim();
    const spelledIncorrectly = document
      .querySelector("p.no-results__subheading")
      ?.textContent?.trim();

    if (couldNotFind || spelledIncorrectly) return false;

    return true;
  });
}

export async function clickSeeMore(page: Page) {
  const button = await page.evaluate(() => {
    return document.querySelector(
      "button.infinite-scroller__show-more-button.infinite-scroller__show-more-button--visible"
    )?.textContent;
  });
  if (button)
    page.click(
      "button.infinite-scroller__show-more-button.infinite-scroller__show-more-button--visible"
    );
}

export async function getLinkedinPostsFromPage(
  page: Page,
  url: string,
  keywords: string
) {
  const posts = await page.evaluate(
    (url, keywords) => {
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
            val.querySelector("a.base-card__full-link")?.getAttribute("href") ??
            "",
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
    url,
    keywords
  );
  return posts;
}
