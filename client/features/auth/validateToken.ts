import { cookies } from "next/headers";

// next js middleware runs on server so it does not have cookie system
// therefore you need to pass cookie manualy to header
export async function validateToken() {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("USER-AUTH");
    if (!sessionToken) return false;

    const url = `${process.env.NEXT_PUBLIC_HOST}/auth/validate`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: `USER-AUTH=${sessionToken?.value}`,
      },
    });

    if (res.status >= 400) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
