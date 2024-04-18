export async function getBlacklist() {
  console.log(`${process.env.NEXT_PUBLIC_HOST}/blacklist`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/blacklist`, {
    method: "GET",
  });
  console.log(await res.json());
  return res;
}
