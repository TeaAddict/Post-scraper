import { snakeToCamel } from "@/utils/helpers";
import { Remote } from "@/utils/types/settingsTypes";

export async function getRemote() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/settings/remote`, {
      method: "GET",
      credentials: "include",
    });
    const body = await res.json();
    if (res.status >= 400) throw new Error(body.error);

    const camelCased: any = {};
    Object.keys(body).map(
      (val) => (camelCased[snakeToCamel(val) as keyof Remote] = body[val])
    );

    return camelCased as Remote;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Problem with getting, remote settings:", error);
  }
}
