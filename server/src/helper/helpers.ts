export function sleep(ms_time: number) {
  return new Promise((resolve) => setInterval(resolve, ms_time));
}

export async function getIp(): Promise<string> {
  return fetch("https://api.myip.com").then((res) =>
    res.json().then((body) => body.ip)
  );
}

export function getAgeInDays(date: string) {
  const date1 = new Date(date).getTime();
  const date2 = new Date().getTime();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function camelCaseToSnakeCase(camelCasedWord: string) {
  return camelCasedWord.replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`
  );
}

export function objKeysCamelToSnake(obj: {
  [key: string]: string | boolean | number;
}) {
  const snakeCased: { [key: string]: string | boolean | number } = {};
  Object.keys(obj).forEach(
    (val) => (snakeCased[camelCaseToSnakeCase(val)] = obj[val])
  );
  return snakeCased;
}

export function addUrlParams(
  webUrl: string,
  param: { key: string; value: string }
) {
  const url = new URL(webUrl);
  url.searchParams.set(param.key, param.value);
  return url.toString();
}
