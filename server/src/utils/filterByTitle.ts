import { Post } from "../Types/postTypes";

export function filterPosts(
  posts: Post[],
  filterWordList: string[],
  maxAgeInDays: number
) {
  return posts.filter(
    (post) =>
      !(
        filterWordList.some((word) =>
          post.title.toLowerCase().includes(word)
        ) || post.ageInDays > maxAgeInDays
      )
  );
}
