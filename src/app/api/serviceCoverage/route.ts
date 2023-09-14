import { NextRequest, NextResponse } from "next/server";

const serviceables = [
  {
    zipCode: "85001",
    city: "phoenix",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const zipCode = searchParams.get("zipCode");
  const serviceableArea = serviceables.filter(
    (area) => area.zipCode === zipCode
  );
  if (serviceableArea.length) {
    return NextResponse.json({
      city: serviceableArea[0].city,
    });
  }
  return NextResponse.json({});
}
