export async function getBlacklist() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/blacklist`, {
      method: "GET",
      credentials: "include",
    });
    const resBody = await res.json();
    if (res.status >= 400) throw new Error(resBody.error);

    return await resBody;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error);
  }
}
