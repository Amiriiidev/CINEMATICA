export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch("https://moviesapi.ir/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
    });
  } catch (error) {
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}
