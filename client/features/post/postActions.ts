import { objectSnakeToCamel } from "@/utils/helpers";
import { Post } from "@/utils/types/postTypes";

type Data = {
  keyword: string;
  location?: string;
};

export type UpdateData = {
  id: number;
  body: { [key: string]: string | number | boolean };
};

export async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/post`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });
    const resBody = await res.json();
    if (res.status >= 400) throw new Error(resBody.error);

    return resBody;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error);
  }
}

export async function getNewPosts({ keyword, location }: Data) {
  try {
    if (!keyword) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/scrape`, {
      credentials: "include",
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keyword,
        location,
      }),
    });
    const resBody:
      | { maxPosts: number; cleanPosts: Post[] }
      | { error: string } = await res.json();

    if ("error" in resBody) throw new Error(resBody.error);

    if ("message" in resBody) {
      return resBody.message;
    }

    const camelCasedPosts = resBody.cleanPosts.map((post) =>
      objectSnakeToCamel(post)
    );

    return { maxPosts: resBody.maxPosts, posts: camelCasedPosts };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deletePost(id: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/post/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const resBody = await res.json();
    if (res.status >= 400) throw new Error(resBody.error);

    return resBody;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updatePost({ id, body }: UpdateData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/post/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const resBody = await res.json();
    if (res.status >= 400) throw new Error(resBody.error);

    return resBody;
  } catch (error: any) {
    throw new Error(error);
  }
}
