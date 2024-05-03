export async function updateCheckbox(data: {
  name: string;
  updateData: { [key: string]: boolean };
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/settings/${data.name}`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.updateData),
      }
    );
    const resBody = await res.json();
    if (res.status >= 400) throw new Error(resBody.error);

    return data.name;
  } catch (error) {
    console.log(error);
  }
}
