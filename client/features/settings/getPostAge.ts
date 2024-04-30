import { PostAge } from "@/utils/types/settingsTypes";

export async function getPostAge() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/settings/postAge`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const body = await res.json();
    if (res.status >= 400) throw new Error(body.error);

    return body as PostAge;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Problem with getting, postAge settings:", error);
  }
}
