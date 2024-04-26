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
