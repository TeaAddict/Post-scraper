import { Remote } from "@/utils/types/settingsTypes";

export async function getRemote() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/settings/remote`, {
      method: "GET",
      credentials: "include",
    });
    const body = await res.json();
    if (res.status >= 400) throw new Error(body.error);

    return body as Remote;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Problem with getting, remote settings:", error);
  }
}
