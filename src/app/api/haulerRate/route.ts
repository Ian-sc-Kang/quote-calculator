import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const size = Number(searchParams.get("size"));
  const city = searchParams.get("city");
  const qty = Number(searchParams.get("qty"));
  const freq = Number(searchParams.get("freq"));
  const haulerRate = haulerRates.filter(
    (rate) => rate.city === city && rate.size === size && rate.freq === freq
  );
  if (haulerRate[0]) {
    return NextResponse.json({
      ...haulerRate[0],
      amount: haulerRate[0].amount * qty,
    });
  }
  return NextResponse.json({});
}

const haulerRates = [
  {
    city: "phoenix",
    size: 2,
    freq: 1,
    amount: 65.0,
  },
  {
    city: "phoenix",
    size: 3,
    freq: 1,
    amount: 68.0,
  },
  {
    city: "phoenix",
    size: 4,
    freq: 1,
    amount: 86.6,
  },
  {
    city: "phoenix",
    size: 6,
    freq: 1,
    amount: 129.0,
  },
  {
    city: "phoenix",
    size: 8,
    freq: 1,
    amount: 172.0,
  },
  {
    city: "phoenix",
    size: 2,
    freq: 2,
    amount: 86.0,
  },
  {
    city: "phoenix",
    size: 3,
    freq: 2,
    amount: 129.0,
  },
  {
    city: "phoenix",
    size: 4,
    freq: 2,
    amount: 172.0,
  },
  {
    city: "phoenix",
    size: 6,
    freq: 2,
    amount: 258.0,
  },
  {
    city: "phoenix",
    size: 8,
    freq: 2,
    amount: 344.0,
  },
  {
    city: "phoenix",
    size: 2,
    freq: 3,
    amount: 190.0,
  },
  {
    city: "phoenix",
    size: 3,
    freq: 3,
    amount: 193.0,
  },
  {
    city: "phoenix",
    size: 4,
    freq: 3,
    amount: 258.0,
  },
  {
    city: "phoenix",
    size: 6,
    freq: 3,
    amount: 387.0,
  },
  {
    city: "phoenix",
    size: 8,
    freq: 3,
    amount: 516.0,
  },
  {
    city: "phoenix",
    size: 2,
    freq: 4,
    amount: 218.0,
  },
  {
    city: "phoenix",
    size: 3,
    freq: 4,
    amount: 258.0,
  },
  {
    city: "phoenix",
    size: 4,
    freq: 4,
    amount: 344.6,
  },
  {
    city: "phoenix",
    size: 6,
    freq: 4,
    amount: 516.0,
  },
  {
    city: "phoenix",
    size: 8,
    freq: 4,
    amount: 550.0,
  },
  {
    city: "phoenix",
    size: 2,
    freq: 1,
    amount: 270.0,
  },
  {
    city: "phoenix",
    size: 3,
    freq: 1,
    amount: 322.0,
  },
  {
    city: "phoenix",
    size: 4,
    freq: 1,
    amount: 430.0,
  },
  {
    city: "phoenix",
    size: 6,
    freq: 1,
    amount: 645.0,
  },
  {
    city: "phoenix",
    size: 8,
    freq: 1,
    amount: 860.0,
  },
];
