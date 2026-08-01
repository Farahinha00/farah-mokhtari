import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/get-content";
import { isAdminRequest } from "@/lib/require-admin";

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json({ content });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = await request.json();
  try {
    await saveContent(body.content);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
