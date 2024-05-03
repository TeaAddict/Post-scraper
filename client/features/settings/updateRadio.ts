export async function updateRadio(data: {
  name: string;
  age: "any" | "pastMonth" | "pastWeek" | "past24Hours";
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/settings/${data.name}`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age: data.age }),
      }
    );
    const resBody = await res.json();
    if (res.status >= 400) throw new Error(resBody.error);

    return resBody;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
