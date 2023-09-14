import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const _size = Number(searchParams.get("size"));
  const city = searchParams.get("city");
  const qty = Number(searchParams.get("qty"));
  const dumpster = dumpsterPriceTable.filter(
    ({ city, size }) => city === city && size === _size
  );
  if (dumpster.length) {
    return NextResponse.json({
      size: _size,
      city,
      price: dumpster[0].price * qty,
    });
  }
  return NextResponse.json({});
}
const dumpsterPriceTable = [
  {
    city: "phoenix",
    size: 2,
    price: 650,
  },
  {
    city: "phoenix",
    size: 3,
    price: 750,
  },
  {
    city: "phoenix",
    size: 4,
    price: 900,
  },
  {
    city: "phoenix",
    size: 6,
    price: 1050,
  },
  {
    city: "phoenix",
    size: 8,
    price: 1200,
  },
];
