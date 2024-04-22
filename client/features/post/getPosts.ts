export async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/post`);
  } catch (error: any) {
    console.log(error);
    throw new Error("Problem with getting posts:", error);
  }
}
