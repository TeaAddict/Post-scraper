import { Post } from "../../Types/postTypes";

export function filterPostsByKeywords(
  posts: Post[],
  blackListedKeywords: string[]
) {
  const filtered = posts
    .map((post) => {
      if (
        blackListedKeywords.some((val) =>
          post.title.toLowerCase().includes(val)
        )
      ) {
        return;
      } else {
        return post;
      }
    })
    .filter((val) => val !== undefined);
  return filtered;
}
