export function sleep(ms_time: number) {
  return new Promise((resolve) => setInterval(resolve, ms_time));
}

export async function getIp(): Promise<string> {
  return fetch("https://api.myip.com").then((res) =>
    res.json().then((body) => body.ip)
  );
}
