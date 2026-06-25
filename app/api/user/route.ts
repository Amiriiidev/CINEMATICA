import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  const res = await fetch("https://moviesapi.ir/api/user", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": authHeader || "",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  return NextResponse.json(data);
}