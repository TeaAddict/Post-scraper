export async function getBlacklist() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/blacklist`, {
    method: "GET",
  });
  return await res.json();
}
