import { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "./session";

export async function isAdminRequest(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}
