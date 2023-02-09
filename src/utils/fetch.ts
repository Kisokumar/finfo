const CACHE_DURATION = 1 * 60 * 1000; // 1 minutes

const cache: Record<string, { data: any; timestamp: number }> = {};

export async function fetchData(url:string){
  if (cache[url] && Date.now() - cache[url].timestamp < CACHE_DURATION) {
    return cache[url].data;
  }else{
  try {
    const response = await fetch(url);
    const data = await response.json();
    cache[url] = {
      data,
      timestamp: Date.now()
    };
    return data;
  } catch (error:any) {
    return error
  }

  }
}