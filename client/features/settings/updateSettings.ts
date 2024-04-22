export type Settings = {
  appliedFilter?: boolean;
  blacklistedFilter?: boolean;
};

export async function updateSettings(settings: Settings) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/settings`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const body = await res.json();
    if (res.status >= 400) throw new Error(body);

    return body;
  } catch (error: any) {
    console.log(error);
    throw new Error("Problem with updating settings:", error);
  }
}
