export function formatInputForUpdate(
  id: string,
  data: { [key: string]: string | boolean | number | undefined }
) {
  Object.keys(data).forEach((key) => {
    if (data[key as keyof typeof data] === undefined) {
      delete data[key as keyof typeof data];
    }
  });

  const keyValue = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");

  const preparedArr = [...Object.values(data), id];
  return { keyValue, preparedArr };
}