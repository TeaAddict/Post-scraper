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
