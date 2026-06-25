import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const formData = new FormData();
  formData.append("grant_type", "password");
  formData.append("username", body.username);
  formData.append("password", body.password);

  const res = await fetch("https://moviesapi.ir/oauth/token", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  return NextResponse.json(data);
}
