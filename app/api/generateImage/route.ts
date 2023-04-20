import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const prompt = res.prompt;

  // connect to Microsoft Azure function endpoint
  const respose = await fetch("http://localhost:7071/api/generateImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const textData = await respose.text();
  return NextResponse.json(textData);
}
