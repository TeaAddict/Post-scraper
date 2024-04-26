import { camelCaseToSnakeCase } from "./helpers";

export function formatInputForUpdate(data: {
  [key: string]: string | boolean | number | undefined;
}) {
  const snakeCasedData = {} as {
    [key: string]: string | boolean | number | undefined;
  };
  Object.keys(data).forEach(
    (key) => (snakeCasedData[camelCaseToSnakeCase(key)] = data[key])
  );

  Object.keys(snakeCasedData).forEach((key) => {
    if (snakeCasedData[key as keyof typeof snakeCasedData] === undefined) {
      delete snakeCasedData[key as keyof typeof snakeCasedData];
    }
  });

  const keyValue = Object.keys(snakeCasedData)
    .map((key) => `${key} = ?`)
    .join(", ");

  const preparedArr = Object.values(snakeCasedData);
  return { keyValue, preparedArr };
}
