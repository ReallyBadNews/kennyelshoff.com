export default async function fetcher<JSON>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export async function sendRequest<T>(
  url: RequestInfo | URL,
  arg?: Record<string, any>
): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });

  const data: T = await response.json();

  return data;
}
