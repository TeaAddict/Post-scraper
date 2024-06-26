import { snakeToCamel } from "@/utils/helpers";
import { JobType } from "@/utils/types/settingsTypes";

export async function getJobType() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/settings/jobType`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const body = await res.json();
    if (res.status >= 400) throw new Error(body.error);

    const camelCased: any = {};
    Object.keys(body).map(
      (val) => (camelCased[snakeToCamel(val) as keyof JobType] = body[val])
    );

    return camelCased as JobType;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Problem with getting, jobType settings:", error);
  }
}
