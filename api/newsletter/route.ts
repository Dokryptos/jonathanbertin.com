import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Brevo from "sib-api-v3-sdk";

export async function POST(req: Request) {
  const { email } = await req.json();
  const client = Brevo.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY!;

  const apiInstance = new Brevo.ContactsApi();
  const contact = {
    email,
    listIds: [19],
    updateEnabled: true,
  };
  try {
    await apiInstance.createContact(contact);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur Brevo" }, { status: 500 });
  }
}
