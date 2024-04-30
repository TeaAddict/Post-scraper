import { ExperienceLevel } from "@/utils/types/settingsTypes";

export async function getExperienceLevel() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/settings/experienceLevel`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const body = await res.json();
    if (res.status >= 400) throw new Error(body.error);

    return body as ExperienceLevel;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Problem with getting, experienceLevel settings:", error);
  }
}
