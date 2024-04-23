type Data = {
  keyword: string;
  location?: string;
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
    const resBody = await res.json();
    if (res.status >= 400) throw new Error(resBody.error);

    return resBody;
  } catch (error: any) {
    throw new Error(error);
  }
}
