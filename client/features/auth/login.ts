export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    if (!username || !password) {
      throw new Error("Missing username or password");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const resBody = await res.json();

    if (res.status >= 400) throw new Error(resBody.error);

    return resBody;
  } catch (error: any) {
    throw new Error(error);
  }
}
