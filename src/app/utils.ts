export async function fetchDumpsterPrice(
  city: string,
  size: number,
  qty: number
) {
  const res = await fetch(`/api/dumpster?size=${size}&city=${city}&qty=${qty}`);
  const resJson = await res.json();
  return resJson.price;
}

export async function fetchHaulerRate(
  city: string,
  size: number,
  qty: number,
  freq: number
) {
  const res = await fetch(
    `/api/haulerRate?qty=${qty}&size=${size}&city=${city}&freq=${freq}`
  );
  const resJson = await res.json();
  return resJson.amount;
}
