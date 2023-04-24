import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const prompt = res.prompt;

  const url: string = process.env.URL_GENERATE_IMAGE!;

  // connect to Microsoft Azure function endpoint
  const respose = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const textData = await respose.text();
  return NextResponse.json(textData);
}
