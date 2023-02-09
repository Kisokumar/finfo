import { fetchData } from "./fetch";

export async function fetchStock(url:string,ticker:string,){

    



    const res:Response = await fetchData(url);
    const data = await res.json();
    return data
  }