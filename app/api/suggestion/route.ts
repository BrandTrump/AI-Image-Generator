export async function GET(request: Request) {
  const url: string = process.env.URL_SUGGESTION!;

  // connect to Microsoft Azure function endpoint
  const respose = await fetch(url, { cache: "no-store" });

  const textData = await respose.text();
  return new Response(JSON.stringify(textData.trim()), { status: 200 });
}
