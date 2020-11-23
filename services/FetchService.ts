// takes any type, and an url for fetch calls
export async function fetchItem<T>(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return (await response.json()) as T;
}
