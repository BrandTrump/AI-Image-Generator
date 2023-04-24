export async function GET(request: Request) {
  const url: string = process.env.URL_GET_IMAGES!;

  // connect to Microsoft Azure function endpoint
  const respose = await fetch(url, {
    cache: "no-store",
  });

  const blob = await respose.blob();
  const textData = await blob.text();

  const data = JSON.parse(textData);

  return new Response(JSON.stringify(data), { status: 200 });
}
