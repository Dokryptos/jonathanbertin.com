import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.NEXT_API_BREVO_KEY!,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [19], // ton ID de liste Brevo
      updateEnabled: true,
    }),
  });

  if (res.ok) {
    return NextResponse.json({ message: "Inscription réussie 💌" });
  }

  const data = await res.json();
  return NextResponse.json(
    { message: data.message || "Erreur." },
    { status: 400 }
  );
}
