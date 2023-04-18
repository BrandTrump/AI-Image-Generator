export async function GET(request: Request) {
  // connect to Microsoft Azure function endpoint
  const respose = await fetch("...", { cache: "no-store" });

  const textData = await respose.text();
  return new Response(JSON.stringify(textData.trim()), { status: 200 });
}
