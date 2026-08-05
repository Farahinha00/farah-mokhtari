import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    return NextResponse.json({ error: "L'envoi d'email n'est pas configuré sur le serveur." }, { status: 500 });
  }

  const { name, email, project, message } = await request.json();

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Le message est requis." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Portfolio Farah Mokhtari <onboarding@resend.dev>",
    to,
    replyTo: typeof email === "string" && email.trim() ? email : undefined,
    subject: `Nouveau message depuis le portfolio${name ? ` — ${name}` : ""}`,
    text: [
      `Nom: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Type de mission: ${project || "-"}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Échec de l'envoi de l'email." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
