export async function deleteFromBlacklist(keyword: string) {
  try {
    if (!keyword) throw new Error("Keyword cant be empty");
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/blacklist`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword: keyword }),
    });
    const resBody = await res.json();
    if (res.status >= 400) throw new Error(resBody.error);

    return resBody;
  } catch (error: any) {
    throw new Error(error);
  }
}
