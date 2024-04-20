export async function addToBlacklist(keyword: string) {
  if (!keyword) throw new Error("Keyword cant be empty");
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/blacklist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keyword: keyword }),
  });
  const resBody = await res.json();
  return resBody;
}
