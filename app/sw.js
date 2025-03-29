export const runtime = "nodejs"

export async function GET() {
  const swContent = await fetch(new URL("/sw.js", process.env.NEXT_PUBLIC_APP_URL)).then((res) => res.text())
  return new Response(swContent, {
    headers: {
      "Content-Type": "application/javascript",
    },
  })
}

