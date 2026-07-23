import { NextResponse } from "next/server";
import {
  createSessionToken,
  getSessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = String(body.password ?? "");

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { error: "Mot de passe incorrect." },
        { status: 401 },
      );
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ ok: true });
    const cookie = getSessionCookieOptions(token);
    response.cookies.set(cookie.name, cookie.value, cookie);
    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Configuration serveur incomplète." },
      { status: 500 },
    );
  }
}
