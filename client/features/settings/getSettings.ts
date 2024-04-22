export async function getSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/settings`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });
    const body = await res.json();
    if (res.status >= 400) throw new Error(body);

    return body;
  } catch (error: any) {
    console.log(error);
    throw new Error("Problem with getting settings:", error);
  }
}
