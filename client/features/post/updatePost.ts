export type Data = {
  id: number;
  body: { [key: string]: string | number | boolean };
};

export async function updatePost({ id, body }: Data) {
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
