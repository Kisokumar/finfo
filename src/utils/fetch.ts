const BASE_CACHE_DURATION = 1 * 60 * 1000; // 1 minutes
const cache: Record<string, { data: any; timestamp: number }> = {};

export default async function fetchData(url: string, holdTime: number) {
  if (
    cache[url] &&
    Date.now() - cache[url].timestamp < BASE_CACHE_DURATION * holdTime
  ) {
    return cache[url].data;
  } else {
    try {
      const response = await fetch(url);
      const data = await response.json();
      cache[url] = {
        data,
        timestamp: Date.now(),
      };
      return data;
    } catch (error: any) {
      return error;
    }
  }
}
